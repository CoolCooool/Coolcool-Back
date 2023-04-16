import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '@root/common/domain/base-time.entity';

@Entity('board')
export class Board extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number; // id of board.

  @Column({ length: 600 })
  contents: string; // board contents

  @Column({ default: 0 })
  likes: number; // number of likes

  @Column({ length: 200 })
  title: string; // board title

  @Column()
  userId: number; // user name

  @Column()
  categoryId: number; // category name (id)

  @Column({ default: false })
  isDeleted: boolean; //
}
