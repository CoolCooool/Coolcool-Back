import { IsNumber, IsString, IsDate, IsCurrency } from 'class-validator';
import { Transform } from 'class-transformer';
import { TransformDate } from '@root/common/transformer/date-transformer';

export class CreateOrderDto {
  @IsCurrency()
  order_amount: string;

  @IsDate()
  @Transform(TransformDate)
  order_date: Date;

  @IsString()
  device_id: string;

  @IsString()
  delivery_id: string;

  @IsNumber()
  imp_uid: number;
}
