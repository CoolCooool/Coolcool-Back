import { IsNumber, IsString, IsDate, IsCurrency, IsDateString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TransformDate } from '@root/common/transformer/date-transformer';
import { LocalDateTimeTransformer } from '@root/common/transformer/local-date-time-transformer';
import { LocalDateTransformer } from '@root/common/transformer/local-date-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    example: 40000,
    description: '주문금액',
    required: true,
  })
  @IsNumber()
  orderAmount: number;

  @ApiProperty({ description: '주문날짜' })
  // @IsDate()
  // @Transform(TransformDate)
  // @Type(() => Date)
  // @Transform(LocalDateTransformer)
  orderDate: Date;

  @ApiProperty({ description: '장치 ID' })
  @IsNumber()
  deviceId: number;

  @ApiProperty({ description: '배송 ID' })
  @IsNumber()
  deliveryId: number;

  @ApiProperty({ description: '결제 ID' })
  @IsNumber()
  impUid: number;
}
