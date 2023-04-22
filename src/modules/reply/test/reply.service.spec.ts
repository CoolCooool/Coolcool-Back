import { Test, TestingModule } from '@nestjs/testing';
import { ReplyService } from '../reply.service';
import { getPgTestTypeTrmModule } from '@root/common/config/get-pg-test-type-trm-module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '@root/modules/board/entity/board.entity';
import { BoardsController } from '@root/modules/board/boards.controller';
import { ReplyController } from '@root/modules/reply/reply.controller';
import { Reply } from '@root/modules/reply/entity/reply.entity';

describe('ReplyService', () => {
  let service: ReplyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [getPgTestTypeTrmModule(), TypeOrmModule.forFeature([Reply])],
      controllers: [ReplyController],
      providers: [ReplyService],
    }).compile();

    service = module.get<ReplyService>(ReplyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
