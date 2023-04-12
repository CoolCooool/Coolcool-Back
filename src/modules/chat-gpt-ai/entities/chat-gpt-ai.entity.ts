import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '@root/common/domain/base-time.entity';
@Entity(`chat-gpt-ai`)
export class ChatGPTReport extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  'id': number;

  @Column()
  'query': string;

  @Column()
  'answer': string;

  @Column()
  'user_id': number;

  @Column()
  'is_deleted': boolean;
}
