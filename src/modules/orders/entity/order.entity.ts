import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '@root/common/domain/base-time.entity';

@Entity()
export class Order extends BaseTimeEntity {
  // 주문 ID
  @PrimaryGeneratedColumn()
  id: number;

  // 주문 금액
  @Column()
  orderAmount: number;

  // 주문 날짜
  @Column()
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
}
