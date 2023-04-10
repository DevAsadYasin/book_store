import { Controller, Get, Param, Query } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}
  @Get()
  findAll(@Query() queryParams: any) {
    const { title, writer } = queryParams;
    return this.booksService.findAll(title, writer);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() queryParams: any) {
    const { title, writer } = queryParams;
    return this.booksService.findOne(+id, title, writer);
  }
}
