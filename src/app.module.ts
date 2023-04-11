import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '../cool-config/back/typeorm.config';
import { BoardsModule } from '@root/modules/board/boards.module';
import { UserModule } from '@root/modules/user/user.module';
@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), UserModule, BoardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
