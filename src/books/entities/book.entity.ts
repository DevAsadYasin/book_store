import { ApiProperty } from '@nestjs/swagger';
import { Book } from '@prisma/client';

export class BookEntity implements Book {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: true })
  writer: string;

  @ApiProperty({ required: true })
  coverImage: string;

  @ApiProperty({ required: true })
  points: number;

  @ApiProperty({ required: true })
  tags: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
