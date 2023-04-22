import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '@root/common/domain/base-time.entity';
import { Board } from '@root/modules/board/entity/board.entity';

@Entity('reply')
export class Reply extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  content: string;

  @Column()
  userId: number;

  @ManyToOne(() => Board, (board) => board.replies, { nullable: true })
  board: Board;
}
