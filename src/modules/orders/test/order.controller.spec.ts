import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../order.controller';
import { OrderService } from '../order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderNotFoundException } from '../exception/order-not-found.exception';
import { Order } from '@root/modules/orders/entity/order.entity';
import { getPgTestTypeTrmModule } from '@root/common/config/get-pg-test-type-trm-module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@root/modules/user/entity/user.entity';
import { instance, mock, when } from 'ts-mockito';
import { HttpStatus } from '@nestjs/common';
import { UserService } from '@root/modules/user/user.service';
import { UserController } from '@root/modules/user/user.controller';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [getPgTestTypeTrmModule(), TypeOrmModule.forFeature([Order])],
      controllers: [OrderController],
      providers: [OrderService],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an order', async () => {
      const id = 1;
      const order = new Order();
      order.id = id;

      const id2 = 2;
      const order2 = new Order();
      order.id = id2;

      const orders: Order[] = [order, order2];

      const stubOrderApiService: OrderService = mock(OrderService);
      when(stubOrderApiService.findAll()).thenResolve([order, order2]);

      controller = new OrderController(instance(stubOrderApiService));

      const result = await controller.findAll();
      expect(result.data).toHaveLength(2);
    });

    it('should throw an OrderNotFoundException if orders are not found', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValue(new OrderNotFoundException());

      await expect(controller.findAll()).rejects.toThrowError(OrderNotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return an order', async () => {
      const id = 1;
      const order = new Order();
      order.id = id;

      const stubOrderApiService: OrderService = mock(OrderService);
      when(stubOrderApiService.findAll()).thenResolve([order]);

      controller = new OrderController(instance(stubOrderApiService));

      const orders = await controller.findAll();
      expect(orders.data).toHaveLength(id);
      expect(orders.data.at(0).id).toBe(1);
    });

    it('should throw an OrderNotFoundException if the order is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new OrderNotFoundException());

      await expect(controller.findOne(1)).rejects.toThrowError(OrderNotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a new order', async () => {
      const newOrder = new CreateOrderDto();
      newOrder.orderAmount = 10000;
      newOrder.orderDate = new Date();
      newOrder.deviceId = 1234;
      newOrder.deliveryId = 5678;
      newOrder.impUid = 90101112;

      const createdOrder = new Order();
      createdOrder.id = 1;
      createdOrder.orderAmount = newOrder.orderAmount;
      createdOrder.orderDate = newOrder.orderDate;
      createdOrder.deviceId = newOrder.deviceId;
      createdOrder.deliveryId = newOrder.deliveryId;
      createdOrder.impUid = newOrder.impUid;

      const stubOrderApiService: OrderService = mock(OrderService);
      when(stubOrderApiService.create(newOrder)).thenResolve(createdOrder);

      controller = new OrderController(instance(stubOrderApiService));

      const response = await controller.create(newOrder);
      // console.log(response.data);

      // 여기 고쳐야함!
      expect(response.data).toBeDefined();
    });

    // it('should throw an error if the order is not created', async () => {
    //   const newOrder = new CreateOrderDto();
    //   newOrder.order_amount = '10000';
    //   newOrder.order_date = new Date();
    //   newOrder.device_id = '1234';
    //   newOrder.delivery_id = '5678';
    //   newOrder.imp_uid = 90101112;
    //   jest.spyOn(service, 'create').mockRejectedValue(new OrderNotFoundException());
    //
    //   await expect(controller.create(newOrder)).rejects.toThrowError(OrderNotFoundException);
    // });
  });

  describe('update', () => {
    // it('should update an order', async () => {
    //   const order: UpdateOrderDto = new UpdateOrderDto();
    //   const result: Order = new Order();
    //   jest.spyOn(service, 'update').mockResolvedValue(result);
    //
    //   expect(await controller.update(1, order)).toBe(result);
    // });
  });

  describe('delete', () => {
    // it('should delete an order', async () => {
    //   const result: Order = new Order();
    //   jest.spyOn(service, 'delete').mockResolvedValue(result);
    //
    //   expect(await controller.delete(1)).toBe(result);
    // });
  });
});
