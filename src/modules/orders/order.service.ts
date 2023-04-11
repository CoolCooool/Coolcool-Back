import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(order: Order) {
    console.log(order);
    return this.orderRepository.save(order);
  }

  async findAll() {
    return this.orderRepository.find();
  }

  async findById(id: number) {
    return this.orderRepository.findOneBy({ id });
  }

  async update(id: number, order: Order) {
    await this.orderRepository.update(id, order);
  }

  async delete(id: number) {
    await this.orderRepository.delete(id);
  }
}
