import { BooksService } from 'src/books/books.service';
import { CustomersService } from 'src/customers/customers.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './orders.repository';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';

@Injectable()
export class OrdersService {
  constructor(
    private bookService: BooksService,
    private customerService: CustomersService,
    private orderRepository: OrderRepository,
    private rabbitMQService: RabbitMQService,
  ) {}

  async create(userId: number, createOrderDto: CreateOrderDto) {
    const book = await this.bookService.findOne(createOrderDto.bookId);

    if (!book) throw new NotFoundException({ message: 'Book not found.' });

    const customer = await this.customerService.findOne(userId);

    if (!customer)
      throw new NotFoundException({ message: 'Customer not found.' });

    if (customer.points < book.points) {
      throw new HttpException(
        { message: 'Not enough points' },
        HttpStatus.BAD_REQUEST,
      );
    }

    //Deduct customer points
    const updatedPoints = customer.points - book.points;
    await this.customerService.update(userId, {
      points: updatedPoints,
    });

    const orderCreated = await this.orderRepository.create({
      bookId: book.id,
      customerId: customer.id,
      status: 'COMPLETED',
    });

    await this.rabbitMQService.publishLog(
      `A customer with email: ${customer.email} placed an order.`,
    );

    return {
      message: 'Order Created Successfully',
      order: orderCreated,
    };
  }

  async cancel(userId: number, id: number) {
    const order: any = await this.orderRepository.findOne(id);

    if (!order) throw new NotFoundException({ message: 'Order not found.' });

    //Restore customer points
    const updatedPoints = order.customer.points + order.book.points;
    await this.customerService.update(userId, {
      points: updatedPoints,
    });

    //Update the order
    const cancelledOrder = await this.orderRepository.update(order.id, {
      status: 'CANCELLED',
    });

    await this.rabbitMQService.publishLog(
      `A customer with email: ${order.customer.email} cancelled the order.`,
    );

    return {
      message: 'Order Cancelled Successfully',
      order: cancelledOrder,
    };
  }

  async findAll(customerId: number, pageNo: number, limit: number) {
    await this.rabbitMQService.publishLog(`A customer queried his orders.`);
    const orders = await this.orderRepository.findAll({
      customerId,
      pageNo,
      limit,
    });

    if (orders.length === 0) {
      throw new NotFoundException('No Orders Found');
    }

    return orders;
  }
}
