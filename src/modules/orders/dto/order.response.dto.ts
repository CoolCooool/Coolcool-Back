import { Exclude, Expose } from 'class-transformer';
import { Order } from '@root/modules/orders/entity/order.entity';

export class OrderResponseDto {
  @Exclude() private readonly _id: number;

  @Exclude() private readonly _orderAmount: number;

  @Exclude() private readonly _orderDate: Date;

  @Exclude() private readonly _deviceId: number;

  @Exclude() private readonly _deliveryId: number;

  @Exclude() private readonly _impUid: number;

  constructor(order: Order) {
    this._id = order.id;
    this._orderAmount = order.orderAmount;
    this._orderDate = order.orderDate;
    this._deviceId = order.deviceId;
    this._deliveryId = order.deliveryId;
    this._impUid = order.impUid;
  }

  @Expose()
  get orderId(): number {
    return this._id;
  }

  @Expose()
  get orderAmount(): number {
    return this._orderAmount;
  }

  @Expose()
  get orderDate(): Date {
    return this._orderDate;
  }

  @Expose()
  get deviceId(): number {
    return this._deviceId;
  }

  @Expose()
  get deliveryId(): number {
    return this._deliveryId;
  }

  @Expose()
  get imp_uid(): number {
    return this._impUid;
  }
}
