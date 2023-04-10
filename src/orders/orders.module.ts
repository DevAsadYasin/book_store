import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { BooksModule } from 'src/books/books.module';
import { CustomersModule } from 'src/customers/customers.module';
import { BooksService } from 'src/books/books.service';
import { CustomersService } from 'src/customers/customers.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
import { RabbitmqModule } from 'src/rabbitmq/rabbitmq.module';
import { OrderRepository } from './orders.repository';
import { CustomerRepository } from 'src/customers/customers.respository';
import { BookRepository } from 'src/books/books.repository';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrderRepository,
    CustomerRepository,
    BooksService,
    BookRepository,
    CustomersService,
    RabbitMQService,
  ],
  imports: [
    PrismaModule,
    ConfigModule,
    BooksModule,
    CustomersModule,
    RabbitmqModule,
    JwtModule,
  ],
})
export class OrdersModule {}
