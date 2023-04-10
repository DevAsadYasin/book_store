import { Injectable, NotFoundException } from '@nestjs/common';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';
import { BookRepository } from './books.repository';

@Injectable()
export class BooksService {
  constructor(
    private bookRepository: BookRepository,
    private rabbitMQService: RabbitMQService,
  ) {}

  async findAll(title?: string, writer?: string) {
    await this.rabbitMQService.publishLog(`A customer queried all books`);

    const books = await this.bookRepository.findAll({ title, writer });
    if (books.length === 0) {
      throw new NotFoundException('No Books Found');
    }

    return books;
  }

  async findOne(bookId: number, title?: string, writer?: string) {
    await this.rabbitMQService.publishLog(`A customer queried one book`);

    const book = await this.bookRepository.findOne({
      id: bookId,
      title,
      writer,
    });

    if (!book) {
      throw new NotFoundException('No Book Found');
    }

    return book;
  }
}
