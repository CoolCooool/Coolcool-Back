import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  // extends baseTIME entity!
  // 주문 ID
  @PrimaryGeneratedColumn()
  orderId: number;

  // 주문 금액
  @Column()
  orderAmount: string;

  // 주문 날짜
  @Column()
  orderDate: Date;

  // 생성일
  @Column()
  createDate: Date;

  // 수정일
  @Column()
  updateDate: Date;

  // 장치
  // @OneToOne(() => Device)
  @Column()
  deviceId: string;

  // 배송
  // @OneToOne(() => Delivery)
  @Column()
  deliveryId: string;

  // 결제 ID
  // @OneToOne(() => Payment)
  @Column()
  imp_uid: number;
}
