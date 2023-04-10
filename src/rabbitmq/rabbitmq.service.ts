import { Injectable } from '@nestjs/common';
import { connect, Connection, Channel } from 'amqplib';

@Injectable()
export class RabbitMQService {
  private connection: Connection;
  private channel: Channel;

  async onModuleInit() {
    await this.connect();
    await this.createChannel();
  }

  async createChannel() {
    this.channel = await this.connection.createChannel();
  }
  async connect() {
    this.connection = await connect('amqp://localhost:5672');
    this.channel = await this.connection.createChannel();
  }
  getChannel(): Channel {
    return this.channel;
  }

  async publishLog(log: string) {
    const queue = 'logs';
    await this.channel.assertQueue(queue, { durable: false });
    this.channel.sendToQueue(queue, Buffer.from(log));
  }

  async closeConnection() {
    await this.channel.close();
    await this.connection.close();
  }
}
