import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '@root/common/domain/base-time.entity';

@Entity('board')
export class Board extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number; // id of board.

  @Column({ length: 600 })
  contents: string; // board contents

  @Column()
  likes: number; // number of likes

  @Column({ length: 200 })
  title: string; // board title

  @Column()
  user_id: number; // user name

  @Column()
  category_id: number; // category name (id)

  @Column()
  is_deleted: boolean; //
}
