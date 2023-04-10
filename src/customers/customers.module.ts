import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
import { RabbitmqModule } from 'src/rabbitmq/rabbitmq.module';
import { CustomerRepository } from './customers.respository';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, RabbitMQService, CustomerRepository],
  imports: [PrismaModule, JwtModule, ConfigModule, RabbitmqModule],
})
export class CustomersModule {}
