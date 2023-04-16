import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '../cool-config/back/typeorm.config';
import { UserModule } from '@root/modules/user/user.module';
import { OrderModule } from './modules/orders/orders.module';
import { BoardsModule } from '@root/modules/board/boards.module';
@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), UserModule, BoardsModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
