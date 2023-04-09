import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(order: Order): Promise<Order> {
    return this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  // async findOne(id: number): Promise<Order> {
  //   return this.orderRepository.findOne(id);
  // }

  // async findOne(id: number): Promise<Order> {
  //   return this.orderRepository.findOneBy({ id });
  // }

  async update(id: number, order: Order): Promise<void> {
    await this.orderRepository.update(id, order);
  }

  async delete(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
