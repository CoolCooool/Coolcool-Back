import { IsNumber, IsString, IsDate, IsCurrency, IsDateString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TransformDate } from '@root/common/transformer/date-transformer';
import { LocalDateTimeTransformer } from '@root/common/transformer/local-date-time-transformer';
import { LocalDateTransformer } from '@root/common/transformer/local-date-transformer';

export class CreateOrderDto {
  @IsCurrency()
  orderAmount: number;

  @IsDate()
  // @Transform(TransformDate)
  // @Type(() => Date)
  // @Transform(LocalDateTransformer.apply)
  orderDate: Date;

  @IsNumber()
  deviceId: number;

  @IsNumber()
  deliveryId: number;

  @IsNumber()
  impUid: number;
}
