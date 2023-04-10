import { Controller, Post, Body, Param, Delete } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('/signup')
  signup(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.signup(createCustomerDto);
  }

  @Post('/login')
  login(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.login(createCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }
}
