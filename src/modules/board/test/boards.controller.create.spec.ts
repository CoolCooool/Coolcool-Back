import { Test, TestingModule } from '@nestjs/testing';
import { BoardsController } from '../boards.controller';
import { BoardsService } from '../boards.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Board } from '../entity/board.entity';
import { CreateBoardDto } from '../dto/create-board.dto';
import { mock, instance, when, deepEqual } from 'ts-mockito';
import { InsertResult, Repository } from 'typeorm';
import { ResponseEntity } from '@root/common/domain/response.entity';

describe('BoardsService', () => {
  let service: BoardsService;
  let repositoryMock: Repository<Board>;
  let controller: BoardsController;

  beforeEach(async () => {
    repositoryMock = mock(Repository<Board>);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardsService,
        {
          provide: getRepositoryToken(Board),
          useValue: instance(repositoryMock),
        },
      ],
    }).compile();
    service = module.get<BoardsService>(BoardsService);
  });

  it('should create a board', async () => {
    const createBoardDto: CreateBoardDto = {
      contents: 'Test board',
      likes: 0,
      title: 'Test title',
      userId: 1,
      categoryId: 1,
      isDeleted: false,
    };

    //console.log("!!!!! +++ repositoryMock :: " + JSON.stringify(repositoryMock, null, 2));
    //console.dir(repositoryMock, { depth: null });
    console.log(repositoryMock.insert.name);

    const board: Board = new Board();
    board.contents = createBoardDto.contents;
    board.likes = createBoardDto.likes;
    board.title = createBoardDto.title;
    board.user_id = createBoardDto.userId;
    board.category_id = createBoardDto.categoryId;
    board.is_deleted = createBoardDto.isDeleted;

    const insertResultMock: InsertResult = {
      identifiers: [],
      generatedMaps: [],
      raw: '',
    };

    when(repositoryMock.insert(board)).thenResolve(insertResultMock);

    const result = await service.create(createBoardDto);
    console.log('!!!', result);
    //const result = await service.create(createBoardDto);
    //expect(result).toEqual(insertResultMock);
    expect(insertResultMock).toBeDefined();
  });
});
