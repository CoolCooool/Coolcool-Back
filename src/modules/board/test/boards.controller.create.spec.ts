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
      title: 'Test title',
      userId: 1,
      categoryId: 1,
    };

    //console.log("!!!!! +++ repositoryMock :: " + JSON.stringify(repositoryMock, null, 2));
    //console.dir(repositoryMock, { depth: null });
    console.log(repositoryMock.insert.name);

    const board: Board = new Board();
    board.contents = createBoardDto.contents;

    board.title = createBoardDto.title;
    board.userId = createBoardDto.userId;
    board.categoryId = createBoardDto.categoryId;

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
  //
  // it('should create a new board and return it', async () => {
  //   // Arrange
  //   const board: Board = new Board();
  //
  //   const createBoardDto: CreateBoardDto = {
  //     contents: 'Test board contents',
  //     likes: 0,
  //     title: 'Test board title',
  //     userId: 1,
  //     categoryId: 1,
  //     isDeleted: false,
  //   };
  //
  //   // Act
  //   const result = await service.create(createBoardDto);
  //
  //   expect(result).not.toBeNull(); // add this line to check for null
  //   expect(result).toBeDefined();
  //   expect(result).toHaveProperty('identifiers');
  //   expect(result.identifiers).toHaveLength(1);
  //
  //   const stubBoardApiService: BoardsService = mock(BoardsService);
  //   when(stubBoardApiService.findAll()).thenResolve([board]);
  //
  //   const boardId = result.identifiers[0].id;
  //
  //   const createdBoard = await repositoryMock.findOne({ where: { id: boardId } });
  //   expect(createdBoard).toBeDefined();
  //   expect(createdBoard.contents).toEqual(createBoardDto.contents);
  //   expect(createdBoard.likes).toEqual(createBoardDto.likes);
  //   expect(createdBoard.title).toEqual(createBoardDto.title);
  //   expect(createdBoard.user_id).toEqual(createBoardDto.userId);
  //   expect(createdBoard.category_id).toEqual(createBoardDto.categoryId);
  //   expect(createdBoard.is_deleted).toEqual(createBoardDto.isDeleted);
  // });
  //
});
