import { ApiProperty } from '@nestjs/swagger';
import { Order } from '@prisma/client';

export class OrderEntity implements Order {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: true })
  status: string;

  @ApiProperty({ required: true })
  customerId: number;

  @ApiProperty({ required: true })
  bookId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
