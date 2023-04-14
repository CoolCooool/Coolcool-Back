import { PartialType } from '@nestjs/mapped-types';
import { CreateChatGptAiDto } from './create-chat-gpt-ai.dto';

export class UpdateChatGptAiDto extends PartialType(CreateChatGptAiDto) {
  answer: string;
}
