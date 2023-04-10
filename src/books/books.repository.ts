import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllBookDB, FindOneBookDB } from './types/repositoryTypes';

@Injectable()
export class BookRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: FindAllBookDB) {
    return this.prisma.book.findMany({
      where: query,
    });
  }
  async findOne(query?: FindOneBookDB) {
    return this.prisma.book.findFirst({
      where: query,
    });
  }
}
