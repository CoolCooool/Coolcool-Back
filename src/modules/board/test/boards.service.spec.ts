import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '@root/modules/board/entity/board.entity';
import { instance, mock, when } from 'ts-mockito';
import { Reply } from '@root/modules/reply/entity/reply.entity';
import { BoardsService } from '../boards.service';

describe('BoardService', () => {
  let boardService: BoardsService;
  let boardRepository: Repository<Board>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        BoardsService,
        {
          provide: getRepositoryToken(Board),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Reply),
          useClass: Repository,
        },
      ],
    }).compile();

    boardService = moduleRef.get<BoardsService>(BoardsService);
    boardRepository = moduleRef.get<Repository<Board>>(getRepositoryToken(Board));
  });

  describe('findAll', () => {
    it('should return an array of boards', async () => {
      //const result = [{ id: 1, title: 'Board 1' }];
      const boards = new Array<Board>();
      const board = new Board();
      board.id = 1;
      const reply = new Reply();
      reply.id = 3;
      board.replies = [reply];
      const board2 = new Board();
      board2.id = 2;

      boards.push(board);
      boards.push(board2);

      jest.spyOn(boardRepository, 'find').mockResolvedValue(boards);
      expect(await boardService.findAll()).toHaveLength(2);
    });
  });
});
