import { IsString } from 'class-validator';

export class CreateChatGptAiDto {
  @IsString()
  readonly query: string;
}
