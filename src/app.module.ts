import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@root/app.controller';
import { AppService } from '@root/app.service';
import { ConfigModule } from '@nestjs/config';
import { PostgreSQLConfigService } from '@root/config/database/config.service';
import { PostgreSQLConfigModule } from '@root/config/database/config.module';
import { UserModule } from '@root/modules/user/user.module';
import { BoardsModule } from '@root/modules/board/boards.module';
import { OrderModule } from '@root/modules/orders/orders.module';
import { ChatGptAiModule } from '@root/modules/chat-gpt-ai/chat-gpt-ai.module';
import { ReplyModule } from '@root/modules/reply/reply.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './cool-config/back/.env' }),
    TypeOrmModule.forRootAsync({
      imports: [PostgreSQLConfigModule],
      useClass: PostgreSQLConfigService,
      inject: [PostgreSQLConfigService],
    }),
    UserModule,
    BoardsModule,
    OrderModule,
    ChatGptAiModule,
    ReplyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
