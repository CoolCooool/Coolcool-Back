import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  // ResponseEntity.OK_WITH()으로 싸서 리턴하기
  // -> 프론트와 통신하기 위해서 하는 거임

  @Post('/order')
  async create(@Body() order: Order): Promise<Order> {
    return this.orderService.create(order);
  }

  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  // @Get('/order/:id')
  // async findOne(@Param('id') id: number): Promise<Order> {
  //   return this.orderService.findOne(id);
  // }

  @Put('/order/:id')
  async update(@Param('id') id: number, @Body() order: Order): Promise<void> {
    await this.orderService.update(id, order);
  }

  @Delete('/order/:id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.orderService.delete(id);
  }
}
