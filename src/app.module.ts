import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '../cool-config/back/typeorm.config';
import { OrderModule } from './modules/orders/orders.module';
import { UserModule } from '@root/modules/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), OrderModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
