import { Test, TestingModule } from '@nestjs/testing';
import { BoardsService } from '@root/modules/board/boards.service';
import { getPgTestTypeTrmModule } from '@root/common/config/get-pg-test-type-trm-module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '@root/modules/board/entity/board.entity';

describe('BoardsService', () => {
  let service: BoardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [getPgTestTypeTrmModule(), TypeOrmModule.forFeature([Board])],
      providers: [BoardsService],
    }).compile();

    service = module.get<BoardsService>(BoardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
