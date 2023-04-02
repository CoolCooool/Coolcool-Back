import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// eslint-disable-next-line import/no-extraneous-dependencies
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '../cool-config/back/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
