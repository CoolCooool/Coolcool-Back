import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ChatGptAiService } from './chat-gpt-ai.service';
import { ChatGPTReport } from '@root/modules/chat-gpt-ai/entities/chat-gpt-ai.entity';
import { CreateChatGptAiDto } from '@root/modules/chat-gpt-ai/dto/create-chat-gpt-ai.dto';
import { UpdateChatGptAiDto } from '@root/modules/chat-gpt-ai/dto/update-chat-gpt-ai.dto';

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

  @Patch('/update/:id')
  update(@Param('id') id: number, @Body() updateChatGptAiDto: UpdateChatGptAiDto) {
    console.log('I will update entity');
    return this.service.update(id, updateChatGptAiDto);
  }

  @Put('/delete/:id')
  delete(@Param('id') id: number) {
    console.log('I will SOFT DELETE');
    return this.service.softDelete(id);
  }
}
