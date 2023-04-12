import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { ResponseEntity } from '@root/common/domain/response.entity';
import { OrderNotFoundException } from '@root/modules/orders/exception/order-not-found.exception';
import { OrderResponseDto } from '@root/modules/orders/dto/order.response.dto';
import { CreateOrderDto } from '@root/modules/orders/dto/create-order.dto';
import { UpdateOrderDto } from '@root/modules/orders/dto/update-order.dto';
import { Order } from '@root/modules/orders/entity/order.entity';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async findAll() {
    try {
      return ResponseEntity.OK_WITH(await this.orderService.findAll());
    } catch (e) {
      throw new OrderNotFoundException();
    }
  }

  @Get('/order/:id')
  async findOne(@Param('id') id: number) {
    try {
      return ResponseEntity.OK_WITH(new OrderResponseDto(await this.orderService.findOne(id)));
    } catch (e) {
      throw new OrderNotFoundException();
    }
  }

  @Post('/order')
  async create(@Body() order: CreateOrderDto) {
    try {
      return ResponseEntity.OK_WITH(this.orderService.create(order));
    } catch (e) {
      // 우선은 아무 에러나 던지기!
      throw new OrderNotFoundException();
    }
  }

  @Put('/order/:id')
  async update(@Param('id') id: number, @Body() order: UpdateOrderDto) {
    return ResponseEntity.OK_WITH(this.orderService.update(id, order));
  }

  @Delete('/order/:id')
  async delete(@Param('id') id: number) {
    return ResponseEntity.OK_WITH(this.orderService.delete(id));
  }
}
