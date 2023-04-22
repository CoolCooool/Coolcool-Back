import { Test, TestingModule } from '@nestjs/testing';
import { BoardsController } from '../boards.controller';
import { BoardsService } from '../boards.service';
import { getPgTestTypeTrmModule } from '@root/common/config/get-pg-test-type-trm-module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '@root/modules/board/entity/board.entity';
import { Reply } from '@root/modules/reply/entity/reply.entity';
import { instance, mock, when } from 'ts-mockito';

describe('BoardsController', () => {
  let controller;
  let service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [getPgTestTypeTrmModule(), TypeOrmModule.forFeature([Board, Reply])],
      controllers: [BoardsController],
      providers: [BoardsService],
    }).compile();

    controller = module.get<BoardsController>(BoardsController);
    service = module.get<BoardsService>(BoardsService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  //
  describe('boards', () => {
    it('findBoards', async () => {
      //const boards: Array<Board> = [];

      const id = 1;
      const board = new Board();
      board.id = id;

      const id2 = 2;
      const board2 = new Board();
      board2.id = id2;

      const stubBoardApiService: BoardsService = mock(BoardsService);
      when(stubBoardApiService.findAll()).thenResolve([board, board2]);
      controller = new BoardsController(instance(stubBoardApiService));

      const results = await controller.getBoards();
      expect(results.data[1].id).toBe(id2);
      expect(results.data.length).toEqual(id2);
    });
  });

  describe('boards', () => {
    it('findBoardById', async () => {
      const id = 1;
      const board: Board = new Board();
      board.id = id;

      const stubBoardApiService: BoardsService = mock(BoardsService);
      when(stubBoardApiService.findBy(id, 1)).thenResolve(board);
      controller = new BoardsController(instance(stubBoardApiService));
      const result = await controller.findByIdAndType(id, 1);
      //expect(result).toHaveLength(id);
      expect(result.data.id).toBe(id);
    });
  });

  describe('board search', () => {
    test('1+1 is 2', () => {
      expect(1 + 1).toBe(2);
    });
  });

  // describe('board update', () => {
  //   it ('updateSucceed', async() => {
  //     const id: number = 1;
  //     const board: Board = new Board();
  //     board.id = id;
  //
  //     const savedBoard :Board = new Board();
  //     const stubBoardApiService: BoardsService = mock(BoardsService);
  //     when(stubBoardApiService.update(id, board)).thenResolve(null);
  //     //console.log("!!!!!        " + savedBoard.id);
  //
  //     controller = new BoardsController(instance(stubBoardApiService));
  //
  //     const boards: Board[] = await controller.getBoards();
  //     console.log("!!!!      : " + boards);
  //
  //     //when(stubBoardApiService.findAll()).thenResolve([board]);
  //console.log("????:    " + board);

  //   })
  // });
});
