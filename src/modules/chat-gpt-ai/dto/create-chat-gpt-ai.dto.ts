import { IsNumber, IsString } from 'class-validator';

export class CreateChatGptAiDto {
  @IsString()
  query: string;

  @IsNumber()
  userId: number;
}
