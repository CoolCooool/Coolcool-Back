import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { OrderNotFoundException } from '@root/modules/orders/exception/order-not-found.exception';
import { CreateOrderDto } from '@root/modules/orders/dto/create-order.dto';
import { UpdateOrderDto } from '@root/modules/orders/dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(order: CreateOrderDto) {
    const user = await this.orderRepository.create(order);

    return this.orderRepository.save(order);
  }

  // async create(orderDto: CreateOrderDto) {
  //   const order = new Order();
  //   order.field1 = orderDto.field1;
  //   order.field2 = orderDto.field2;
  //   // 필요한 필드를 모두 복사합니다.
  //
  //   const createdOrder = await this.orderRepository.create(order);
  //   const savedOrder = await this.orderRepository.save(createdOrder);
  //   return savedOrder;
  // }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderRepository.find();

    if (!orders.length) {
      throw new OrderNotFoundException();
    }

    return orders;
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new OrderNotFoundException();
    }

    return order;
  }

  async update(id: number, order: UpdateOrderDto) {
    const updatedOrder = await this.findOne(id);

    if (!updatedOrder) {
      throw new OrderNotFoundException();
    }

    return this.orderRepository.update(id, order);
  }

  async delete(id: number) {
    const order = await this.findOne(id);

    if (!order) {
      throw new OrderNotFoundException();
    }

    return this.orderRepository.delete(id);
  }
}
