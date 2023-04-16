import { Test, TestingModule } from '@nestjs/testing';
import { getConnection, Repository } from 'typeorm';
import { Board } from '@root/modules/board/entity/board.entity';
import { BoardsService } from '../boards.service';
import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { AppModule } from '@root/app.module';
import { getPgTestTypeTrmModule } from '@root/common/config/get-pg-test-type-trm-module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@root/modules/user/entity/user.entity';
import { UserController } from '@root/modules/user/user.controller';
import { UserService } from '@root/modules/user/user.service';
import { BoardsController } from '@root/modules/board/boards.controller';

describe('BoardService', () => {
  let boardService: BoardsService;
  let boardRepository: Repository<Board>;
  let controller: BoardsController;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [getPgTestTypeTrmModule(), TypeOrmModule.forFeature([Board])],
      controllers: [BoardsController],
      providers: [BoardsService],
    }).compile();
    controller = module.get<BoardsController>(BoardsController);

    //boardService = module.get<BoardsService>(BoardsService);
    //boardRepository = module.get<Repository<Board>>(Repository);
  });
  //
  // beforeEach(async () => {
  //     await boardRepository.delete({});
  // });
  //
  // afterAll(async () => {
  //     await getConnection().close();
  // });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  //
  // describe('update', () => {
  //     it('should update a board if it exists in the database', async () => {
  //         // create a mock board
  //         const mockBoard: CreateBoardDto = {
  //             contents: 'Mock contents',
  //             likes: 0,
  //             title: 'Mock Board',
  //             userId: 1,
  //             categoryId: 1,
  //             isDeleted: false,
  //         };
  //         const createdBoard = await boardRepository.save(mockBoard);
  //
  //         // update the mock board
  //         const updateData: UpdateBoardDto = {
  //             title: 'Updated Mock Board',
  //             contents: 'Updated contents',
  //         };
  //         const updatedBoard = await boardService.update(createdBoard.id, updateData);
  //
  //         // assert that the board was updated
  //         expect(updatedBoard.title).toEqual(updateData.title);
  //         expect(updatedBoard.contents).toEqual(updateData.contents);
  //     });
  //
  //     it('should throw an error if the board does not exist in the database', async () => {
  //         // try to update a board that does not exist in the database
  //         const updateData: UpdateBoardDto = {
  //             title: 'Updated Mock Board',
  //             contents: 'Updated contents',
  //         };
  //         await expect(boardService.update(999, updateData)).rejects.toThrow();
  //     });
  // });
});
