import { Exclude, Expose } from 'class-transformer';
import { Order } from '@root/modules/orders/entity/order.entity';

export class OrderResponseDto {
  @Exclude() private readonly _id: number;

  @Exclude() private readonly _order_amount: string;

  @Exclude() private readonly _order_date: Date;

  @Exclude() private readonly _device_id: string;

  @Exclude() private readonly _delivery_id: string;

  @Exclude() private readonly _imp_uid: number;

  constructor(order: Order) {
    this._id = order.id;
    this._order_amount = order.order_amount;
    this._order_date = order.order_date;
    this._device_id = order.device_id;
    this._delivery_id = order.delivery_id;
    this._imp_uid = order.imp_uid;
  }

  @Expose()
  get orderId(): number {
    return this._id;
  }

  @Expose()
  get orderAmount(): string {
    return this._order_amount;
  }

  @Expose()
  get orderDate(): Date {
    return this._order_date;
  }

  @Expose()
  get deviceId(): string {
    return this._device_id;
  }

  @Expose()
  get deliveryId(): string {
    return this._delivery_id;
  }

  @Expose()
  get imp_uid(): number {
    return this._imp_uid;
  }
}
