import { IsNumber, IsString, IsDate, IsCurrency } from 'class-validator';

export class UpdateOrderDto {
  @IsCurrency()
  orderAmount: number;

  @IsDate()
  orderDate: Date;

  @IsNumber()
  deviceId: number;

  @IsNumber()
  deliveryId: number;

  @IsNumber()
  impUid: number;
}
