import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '@root/common/domain/BaseTimeEntity';
@Entity(`chat-gpt-ai`)
export class ChatGptAi extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  'id': number;

  @Column()
  'query': string;

  @Column()
  'answer': string;

  @Column()
  'user_id': number;
}
