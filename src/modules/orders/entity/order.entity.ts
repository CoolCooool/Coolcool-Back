import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '@root/common/domain/base-time.entity';
import { LocalDateTimeTransformer } from '@root/common/transformer/local-date-time-transformer';
import { LocalDateTime } from 'js-joda';
import { DateTimeUtil } from '@root/common/util/date-time.util';

@Entity()
export class Order extends BaseTimeEntity {
  // 주문 ID
  @PrimaryGeneratedColumn()
  id: number;

  // 주문 금액
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  orderAmount: number;

  // 주문 날짜
  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  orderDate: Date;

  // 장치
  // @ManyToOne(() => Device)
  @Column()
  deviceId: number;

  // 배송
  // @OneToOne(() => Delivery)
  @Column()
  deliveryId: number;

  // 결제 ID
  // @OneToOne(() => Payment)
  @Column()
  impUid: number;

  getOrderDate(): LocalDateTime {
    return DateTimeUtil.toLocalDateTime(this.orderDate);
  }
}
