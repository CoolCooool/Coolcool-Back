import { Module } from '@nestjs/common';
import { ChatGptAiController } from './chat-gpt-ai.controller';
import { ChatGptAiService } from './chat-gpt-ai.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGPTReport } from '@root/modules/chat-gpt-ai/entities/chat-gpt-ai.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatGPTReport])],
  controllers: [ChatGptAiController],
  providers: [ChatGptAiService],
})
export class ChatGptAiModule {}
