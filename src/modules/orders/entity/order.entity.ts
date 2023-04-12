import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '@root/common/domain/base-time.entity';

@Entity()
export class Order extends BaseTimeEntity {
  // 주문 ID
  @PrimaryGeneratedColumn()
  id: number;

  // 주문 금액
  @Column()
  order_amount: string;

  // 주문 날짜
  @Column()
  order_date: Date;

  // 장치
  // @OneToOne(() => Device)
  @Column()
  device_id: string;

  // 배송
  // @OneToOne(() => Delivery)
  @Column()
  delivery_id: string;

  // 결제 ID
  // @OneToOne(() => Payment)
  @Column()
  imp_uid: number;
}
