import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
import { CustomerRepository } from './customers.respository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomersService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private rabbitMQService: RabbitMQService,
    private customerRepository: CustomerRepository,
  ) {}

  async signToken(customerId: number): Promise<string> {
    const payload = {
      customerId: customerId,
    };

    const token = await this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
    });

    return token;
  }

  async signup(createCustomerDto: CreateCustomerDto) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createCustomerDto.password, saltOrRounds);

    createCustomerDto.password = hash;
    const customer = await this.customerRepository.findOne({
      email: createCustomerDto.email,
    });

    if (customer)
      throw new HttpException(
        { message: 'Email already exists' },
        HttpStatus.BAD_REQUEST,
      );

    const createdCustomer = await this.customerRepository.create(
      createCustomerDto,
    );

    const token = await this.signToken(createdCustomer.id);

    await this.rabbitMQService.publishLog(
      'A new customer sign up into the app.',
    );

    return { customer: createdCustomer, token: token };
  }

  async login(createCustomerDto: CreateCustomerDto) {
    const customer = await this.customerRepository.findOne({
      email: createCustomerDto.email,
    });

    if (!customer) {
      throw new HttpException(
        { message: 'Email Not Found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const isFound = await bcrypt.compare(
      createCustomerDto.password,
      customer.password,
    );

    if (!isFound)
      throw new HttpException(
        { message: 'Invalid Credentials' },
        HttpStatus.BAD_REQUEST,
      );

    const token = await this.signToken(customer.id);

    await this.rabbitMQService.publishLog('A customer is logged into the app');

    return { token: token };
  }

  async findAll() {
    return await this.customerRepository.findAll({});
  }

  async findOne(id: number) {
    return await this.customerRepository.findOne({ id });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const updatedCustomer = await this.customerRepository.update(
      id,
      updateCustomerDto,
    );

    return updatedCustomer;
  }

  remove(id: number) {
    return this.customerRepository.delete(id);
  }
}
