import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  create(@Request() request, @Body() createOrderDto: CreateOrderDto) {
    const { user } = request;
    return this.ordersService.create(user, createOrderDto);
  }

  @Patch('/cancel/:id')
  @UseGuards(AuthGuard)
  cancel(@Request() request, @Param('id') id: string) {
    const { user } = request;
    return this.ordersService.cancel(user, +id);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(
    @Request() request,
    @Query() queryParams: { pageNo: number; limit: number },
  ) {
    const { user } = request;
    const { pageNo = 1, limit } = queryParams;
    return this.ordersService.findAll(user, +pageNo, +limit);
  }
}
