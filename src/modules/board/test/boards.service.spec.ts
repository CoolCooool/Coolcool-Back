import { Test, TestingModule } from '@nestjs/testing';
import { BoardsController } from '../boards.controller';
import { BoardsService } from '../boards.service';
import { getPgTestTypeTrmModule } from '@root/common/config/get-pg-test-type-trm-module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '@root/modules/board/entity/board.entity';
import { instance, mock, when } from 'ts-mockito';
describe('BoardsService', () => {
  let controller: BoardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [getPgTestTypeTrmModule(), TypeOrmModule.forFeature([Board])],
      controllers: [BoardsController],
      providers: [BoardsService],
    }).compile();

    controller = module.get<BoardsController>(BoardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('boards', () => {
    it('findBoards', async () => {
      const id = 1;
      const board: Board = new Board();
      board.id = id;

      const stubBoardApiService: BoardsService = mock(BoardsService);
      when(stubBoardApiService.findAll()).thenResolve([board]);

      controller = new BoardsController(instance(stubBoardApiService));

      // const boards: Board[] = await controller.getBoards();
      // expect(boards).toHaveLength(id);
      // expect(boards[0].id).toBe(id);
    });
  });

  describe('boards', () => {
    it('findBoardById', async () => {
      const id = 1;
      const board: Board = new Board();
      board.id = id;

      const stubBoardApiService: BoardsService = mock(BoardsService);
      when(stubBoardApiService.findBy(id, 1)).thenResolve([board]);
      controller = new BoardsController(instance(stubBoardApiService));
      // const boards: Board[] = await controller.findByIdAndType(id, 1);
      // expect(boards).toHaveLength(id);
      // expect(boards[0].id).toBe(id);
    });
  });

  describe('board search', () => {
    test('1+1 is 2', () => {
      expect(1 + 1).toBe(2);
    });
  });
});
