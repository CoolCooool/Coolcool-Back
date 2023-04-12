import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ChatGptAiService } from './chat-gpt-ai.service';
import { ChatGPTReport } from '@root/modules/chat-gpt-ai/entities/chat-gpt-ai.entity';
import { CreateChatGptAiDto } from '@root/modules/chat-gpt-ai/dto/create-chat-gpt-ai.dto';

@Controller('chat-gpt-ai')
export class ChatGptAiController {
  constructor(private readonly service: ChatGptAiService) {}

  @Get()
  async findAll(): Promise<ChatGPTReport[]> {
    return this.service.findAll();
  }

  @Get('/user')
  async findById(@Query('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Post('/message')
  getModelAnswer(@Body() data: CreateChatGptAiDto) {
    return this.service.createModelAnswer(data);
  }

  @Put('/delete/:id')
  delete(@Param('id') id: number) {
    console.log('I will SOFT DELETE');
    return this.service.softDelete(id);
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
