import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { ResponseEntity } from '@root/common/domain/response.entity';
import { OrderResponseDto } from '@root/modules/orders/dto/order.response.dto';
import { CreateOrderDto } from '@root/modules/orders/dto/create-order.dto';
import { UpdateOrderDto } from '@root/modules/orders/dto/update-order.dto';
import { Order } from '@root/modules/orders/entity/order.entity';
import { ApiCreatedResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('주문 API')
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiOperation({ summary: '주문 조회(전체)', description: '주문을 조회한다.' })
  @ApiCreatedResponse({ description: '주문을 조회한다.', type: Order })
  @Get()
  async findAll() {
    return ResponseEntity.OK_WITH(await this.orderService.findAll());
  }

  @ApiOperation({ summary: '주문 조회(id)', description: '주문을 조회한다.' })
  @ApiCreatedResponse({ description: '주문을 조회한다.', type: Order })
  @ApiParam({
    name: 'id',
    required: true,
    description: '주문 id',
  })
  @Get('/order/:id')
  async findOne(@Param('id') id: number) {
    return ResponseEntity.OK_WITH(new OrderResponseDto(await this.orderService.findOne(id)));
  }

  @ApiOperation({ summary: '주문 생성', description: '주문을 생성한다.' })
  @ApiCreatedResponse({ description: '주문을 생성한다.', type: Order })
  @Post('/order')
  async create(@Body() order: CreateOrderDto) {
    return ResponseEntity.OK_WITH(this.orderService.create(order));
  }

  @ApiOperation({ summary: '주문 수정', description: '주문을 수정한다.' })
  @ApiCreatedResponse({ description: '주문을 수정한다.', type: Order })
  @Put('/order/:id')
  async update(@Param('id') id: number, @Body() order: UpdateOrderDto) {
    return ResponseEntity.OK_WITH(this.orderService.update(id, order));
  }

  @ApiOperation({ summary: '주문 삭제', description: '주문을 삭제한다.' })
  @ApiCreatedResponse({ description: '주문을 삭제한다.', type: Order })
  @Delete('/order/:id')
  async delete(@Param('id') id: number) {
    return ResponseEntity.OK_WITH(this.orderService.delete(id));
  }
}
