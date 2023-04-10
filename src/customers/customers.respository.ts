import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  FindOneCustomerDB,
  CreateCustomerDB,
  FindAllCustomerDB,
  UpdateCustomerDB,
} from './types/repositoryTypes';

@Injectable()
export class CustomerRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(query: FindAllCustomerDB) {
    return this.prisma.customer.findMany({
      where: query,
    });
  }
  async findOne(query: FindOneCustomerDB) {
    return this.prisma.customer.findFirst({
      where: query,
    });
  }

  async create(createCustomerDto: CreateCustomerDB) {
    return this.prisma.customer.create({
      data: createCustomerDto,
    });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDB) {
    return this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
    });
  }

  async delete(id: number) {
    return this.prisma.customer.delete({
      where: { id },
    });
  }
}
