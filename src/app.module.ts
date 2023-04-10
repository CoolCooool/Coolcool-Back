import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '../cool-config/back/typeorm.config';
import { ChatGptAiModule } from './modules/chat-gpt-ai/chat-gpt-ai.module';
@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), ChatGptAiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
