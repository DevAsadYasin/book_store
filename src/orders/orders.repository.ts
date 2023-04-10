import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateOrderDB,
  FindAllOrderDB,
  UpdateOrderDB,
} from './types/repositoryTypes';

@Injectable()
export class OrderRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(query: FindAllOrderDB) {
    const startIndex = (query.pageNo - 1) * query.limit;
    return this.prisma.order.findMany({
      where: {
        customerId: query.customerId,
      },
      skip: startIndex,
      take: query.limit,
    });
  }
  async findOne(id: number) {
    return this.prisma.order.findFirst({
      where: {
        id,
      },
      include: {
        book: true,
        customer: true,
      },
    });
  }

  async create(order: CreateOrderDB) {
    return this.prisma.order.create({
      data: {
        book: {
          connect: { id: order.bookId },
        },
        customer: {
          connect: { id: order.customerId },
        },
        status: order.status,
      },
    });
  }

  async update(id: number, order: UpdateOrderDB) {
    return this.prisma.order.update({
      where: { id },
      data: order,
    });
  }

  async delete(id: number) {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
