import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '../cool-config/back/typeorm.config';
import { ChatGptAiModule } from './modules/chat-gpt-ai/chat-gpt-ai.module';
import { UserModule } from '@root/modules/user/user.module';
@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), ChatGptAiModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
