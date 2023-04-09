import { Body, Controller, Post } from '@nestjs/common';
import { ChatGptAiService } from './chat-gpt-ai.service';
import { GetAiModelAnswer } from './model/get-ai-model-answer';

@Controller('chat-gpt-ai')
export class ChatGptAiController {
  constructor(private readonly service: ChatGptAiService) {}

  @Post('/message')
  getModelAnswer(@Body() data: GetAiModelAnswer) {
    // console.log(this.service.getModelAnswer(data.question));
    return this.service.getModelAnswer(data.question);
  }
}
