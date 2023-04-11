import { Body, Controller, Post } from '@nestjs/common';
import { ChatGptAiService } from './chat-gpt-ai.service';
import { ChatGptAi } from '@root/modules/chat-gpt-ai/entities/chat-gpt-ai.entity';
import { CreateChatGptAiDto } from '@root/modules/chat-gpt-ai/dto/create-chat-gpt-ai.dto';

@Controller('chat-gpt-ai')
export class ChatGptAiController {
  constructor(private readonly service: ChatGptAiService) {}

  @Post('/message')
  getModelAnswer(@Body() data: CreateChatGptAiDto) {
    return this.service.getModelAnswer(data);
  }
}
