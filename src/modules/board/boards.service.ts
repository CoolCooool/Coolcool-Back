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
    board.user_id = createBoardDto.userId;
    board.category_id = createBoardDto.categoryId;
    board.is_deleted = createBoardDto.isDeleted;

    return this.boardRepository.insert(board);
  }

  async findAll() {
    return this.boardRepository.find({ where: { is_deleted: false } });
  }

  async findBy(id: number, idType: number) {
    if (idType == 1) {
      console.log('id type is 1: it is user id');
      return this.boardRepository.find({ where: { user_id: id, is_deleted: false } });
    } else if (idType == 2) {
      console.log('id type is 2: it is board id');
      return this.boardRepository.find({ where: { id, is_deleted: false } });
    } else if (idType == 3) {
      console.log('id type is 3: and it returns boards of that category');
      return this.boardRepository.find({ where: { category_id: id, is_deleted: false } });
    } else {
      throw new Error('Invalid id type');
    }
  }

  async findByQuestion(question: string) {
    return this.boardRepository
      .createQueryBuilder('board')
      .where('board.contents LIKE :keyword', { keyword: `%${question}%` })
      .andWhere('board.is_deleted = :is_deleted', { is_deleted: false })
      .getMany();
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    //이거 이렇게 짜도 되는가? (삭제 여부를 확인하고 수정해야함.) -> 어차피 접근이 불가능하긴 하네?
    if (this.boardRepository.find({ where: { id, is_deleted: false } })) {
      await this.boardRepository.update(id, updateBoardDto);
    }
  }

  async softDelete(id: number) {
    await this.boardRepository.update(id, { is_deleted: true });
  }
}
