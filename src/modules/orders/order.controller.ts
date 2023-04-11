import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entity/order.entity';
import { ResponseEntity } from '@root/common/domain/response.entity';
import { OrderNotFoundException } from '@root/modules/orders/exception/order-not-found.exception';
import { OrderResponseDto } from '@root/modules/orders/dto/order.response.dto';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async findAll() {
    try {
      return ResponseEntity.OK_WITH(this.orderService.findAll());
    } catch (e) {
      throw new OrderNotFoundException();
    }
  }

  @Get('/order/:id')
  async findById(@Param('id') id: number) {
    try {
      return ResponseEntity.OK_WITH(new OrderResponseDto(await this.orderService.findById(id)));
    } catch (e) {
      throw new OrderNotFoundException();
    }
  }

  @Post('/order')
  async create(@Body() order: Order) {
    try {
      return ResponseEntity.OK_WITH(this.orderService.create(order));
    } catch (e) {
      // throw new Exception();
    }
  }

  @Put('/order/:id')
  async update(@Param('id') id: number, @Body() order: Order): Promise<void> {
    await this.orderService.update(id, order);
  }

  @Delete('/order/:id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.orderService.delete(id);
  }
}
