// consumer.controller.ts
import { Controller } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import * as fs from 'fs';

@Controller()
export class ConsumerController {
  constructor(private rabbitMQService: RabbitMQService) {}

  async onModuleInit() {
    await this.consumeLogs();
  }

  async consumeLogs() {
    const queue = 'logs';
    const channel = await this.rabbitMQService.getChannel();
    await channel.assertQueue(queue, { durable: false });
    console.log('Consumer is waiting for messages...');
    channel.consume(queue, (msg) => {
      if (msg) {
        const log = msg.content.toString();
        console.log(`Received log: ${log}`);
        this.writeLogToFile(log);
        channel.ack(msg);
      }
    });
  }

  writeLogToFile(log: string) {
    fs.appendFile('logs.txt', log + '\n', (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      }
    });
  }
}
