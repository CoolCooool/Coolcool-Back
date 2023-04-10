import { Body, Controller, Post } from '@nestjs/common';
import { ChatGptAiService } from './chat-gpt-ai.service';
import { ChatGptAi } from '@root/modules/chat-gpt-ai/entities/chat-gpt-ai.entity';

@Controller('chat-gpt-ai')
export class ChatGptAiController {
  constructor(private readonly service: ChatGptAiService) {}

  @Post('/message')
  getModelAnswer(@Body() data: ChatGptAi) {
    // console.log(this.service.getModelAnswer(data.question));
    return this.service.getModelAnswer(data.query);
  }
}
