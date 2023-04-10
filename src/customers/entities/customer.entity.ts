import { Customer } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerEntity implements Customer {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  password: string;

  @ApiProperty()
  points: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
