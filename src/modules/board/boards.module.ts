import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '@root/modules/board/entity/board.entity';
import { Reply } from '@root/modules/reply/entity/reply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Reply])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
