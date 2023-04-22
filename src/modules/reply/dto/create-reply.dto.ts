import { IsNumber, IsString } from 'class-validator';
export class CreateReplyDto {
  @IsString()
  content: string;

  @IsNumber()
  userId: number;

  @IsNumber()
  boardId: number;
}
