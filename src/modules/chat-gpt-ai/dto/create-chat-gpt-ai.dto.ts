import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateChatGptAiDto {
  @IsString()
  query: string;

  @IsNumber()
  userId: number;

  @IsString()
  answer: string;

  @IsBoolean()
  isDeleted: boolean;
}
