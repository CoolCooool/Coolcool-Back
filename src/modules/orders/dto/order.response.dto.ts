import { Exclude, Expose } from 'class-transformer';
import { Order } from '@root/modules/orders/entity/order.entity';

export class OrderResponseDto {
  @Exclude() private readonly _id: number;

  @Exclude() private readonly _orderAmount: string;

  @Exclude() private readonly _orderDate: Date;

  @Exclude() private readonly _createDate: Date;

  @Exclude() private readonly _updateDate: Date;

  @Exclude() private readonly _deviceId: string;

  @Exclude() private readonly _deliveryId: string;

  @Exclude() private readonly _imp_uid: number;

  constructor(order: Order) {
    this._id = order.id;
    this._orderAmount = order.orderAmount;
    this._orderDate = order.orderDate;
    this._createDate = order.createDate;
    this._updateDate = order.updateDate;
    this._deviceId = order.deviceId;
    this._deliveryId = order.deliveryId;
    this._imp_uid = order.imp_uid;
  }

  @Expose()
  get orderId(): number {
    return this._id;
  }

  @Expose()
  get orderAmount(): string {
    return this._orderAmount;
  }

  @Expose()
  get orderDate(): Date {
    return this._orderDate;
  }

  @Expose()
  get createDate(): Date {
    return this._createDate;
  }

  @Expose()
  get updateDate(): Date {
    return this._updateDate;
  }

  @Expose()
  get deviceId(): string {
    return this._deviceId;
  }

  @Expose()
  get deliveryId(): string {
    return this._deliveryId;
  }

  @Expose()
  get imp_uid(): number {
    return this._imp_uid;
  }
}
