import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ChatGptAiService } from './chat-gpt-ai.service';
import { ChatGPTReport } from '@root/modules/chat-gpt-ai/entities/chat-gpt-ai.entity';
import { CreateChatGptAiDto } from '@root/modules/chat-gpt-ai/dto/create-chat-gpt-ai.dto';

@Controller('chat-gpt-ai')
export class ChatGptAiController {
  constructor(private readonly service: ChatGptAiService) {}

  @Get()
  async getAll(): Promise<ChatGPTReport[]> {
    return this.service.getAll();
  }
  // @Get('/user/:id')
  // getOne(@Param('id') movieId: number){
  //   return this.service.getOne(movieId);
  // }

  @Post('/message')
  getModelAnswer(@Body() data: CreateChatGptAiDto) {
    return this.service.createModelAnswer(data);
  }
  // @Delete()
  // remove(@Param('id') movieId: number) {
  //   return this.service.deleteOne(movieId);
  // }
  //
  // @Patch(':id')
  // path(@Param('id') movieId: number, @Body() upateData: UpdateChatGptAiDto) {
  //   return this.service.update(movieId, upateData);
  // }
}
