import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BookRepository } from './books.repository';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, BookRepository, RabbitMQService],
  imports: [PrismaModule],
})
export class BooksModule {}
