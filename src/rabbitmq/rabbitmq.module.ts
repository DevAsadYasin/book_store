import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { ConsumerController } from './rabbitmq.controller';

@Module({
  providers: [RabbitMQService],
  controllers: [ConsumerController],
})
export class RabbitmqModule {}
