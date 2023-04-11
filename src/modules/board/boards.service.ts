import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from '@root/modules/board/entity/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(@InjectRepository(Board) private boardRepository: Repository<Board>) {
    this.boardRepository = boardRepository;
  }

  async create(createBoardDto: CreateBoardDto) {
    console.log(createBoardDto);
    const board: Board = new Board();
    board.contents = createBoardDto.contents;
    board.likes = createBoardDto.likes;
    board.title = createBoardDto.title;
    board.userId = createBoardDto.userId;
    board.categoryId = createBoardDto.categoryId;
    board.isDeleted = createBoardDto.isDeleted;

    return this.boardRepository.insert(board);
  }

  async findAll() {
    return this.boardRepository.find();
  }

  async findBy(id: number, idType: number) {
    if (idType == 1) {
      console.log('id type is 1: it is user id');
      return this.boardRepository.find({ where: { userId: id } });
    } else if (idType == 2) {
      console.log('id type is 2: it is board id');
      return this.boardRepository.find({ where: { id } });
    } else if (idType == 3) {
      console.log('id type is 3: and it returns boards of that category');
      return this.boardRepository.find({ where: { categoryId: id } });
    } else {
      throw new Error('Invalid id type');
    }
  }

  async findByQuestion(question: string) {
    return this.boardRepository
      .createQueryBuilder('board')
      .where('board.contents LIKE :keyword', { keyword: `%${question}%` })
      .andWhere('board.isDeleted = :isDeleted', { isDeleted: false })
      .getMany();
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    await this.boardRepository.update(id, updateBoardDto);
  }

  async softDelete(id: number) {
    await this.boardRepository.update(id, { isDeleted: true });
  }
}
