import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateChatGptAiDto {
  @IsString()
  query: string;

  @IsNumber()
  user_id: number;

  @IsBoolean()
  is_deleted: boolean;
}
