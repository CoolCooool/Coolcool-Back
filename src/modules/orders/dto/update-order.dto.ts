import { IsNumber, IsString, IsDate, IsCurrency } from 'class-validator';

export class UpdateOrderDto {
  @IsCurrency()
  order_amount: string;

  @IsDate()
  order_date: string;

  @IsString()
  device_id: string;

  @IsString()
  delivery_id: string;

  @IsNumber()
  imp_uid: number;
}
