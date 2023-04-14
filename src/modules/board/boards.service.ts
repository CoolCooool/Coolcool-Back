import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from '@root/modules/board/entity/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { BoardNotFoundException } from '@root/modules/board/exception/board-not-found.exception';

@Injectable()
export class BoardsService {
  constructor(@InjectRepository(Board) private boardRepository: Repository<Board>) {
    this.boardRepository = boardRepository;
  }

  async create(createBoardDto: CreateBoardDto): Promise<InsertResult> {
    const board: Board = this.boardRepository.create(createBoardDto);
    try {
      return await this.boardRepository.insert(board);
    } catch (error) {
      throw new Error(`Failed to create board: ${error.message}`);
    }
  }

  async findAll(): Promise<Board[]> {
    const boards: Board[] = await this.boardRepository.find({ where: { isDeleted: false } });
    if (boards.length === 0) {
      throw new BoardNotFoundException();
    }
    return this.boardRepository.find({ where: { isDeleted: false } });
  }

  async findBy(id: number, idType: number): Promise<Board[]> {
    if (idType === 1) {
      const boards: Board[] = await this.boardRepository.find({ where: { userId: id, isDeleted: false } });
      if (boards.length === 0) {
        throw new BoardNotFoundException();
      }
      return this.boardRepository.find({ where: { userId: id, isDeleted: false } });
    } else if (idType === 2) {
      return this.boardRepository.find({ where: { id, isDeleted: false } });
    } else if (idType === 3) {
      return this.boardRepository.find({ where: { categoryId: id, isDeleted: false } });
    } else {
      throw new Error('Invalid id type');
    }
  }

  async findByQuestion(question: string): Promise<Board[]> {
    const boards: Board[] = await this.boardRepository
      .createQueryBuilder('board')
      .where('board.contents LIKE :keyword', { keyword: `%${question}%` })
      .andWhere('board.isDeleted = :isDeleted', { isDeleted: false })
      .getMany();
    if (boards.length === 0) {
      throw new BoardNotFoundException();
    }
    return boards;
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    const board = await this.boardRepository.findOne({ where: { id, isDeleted: false } });
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
    const updatedBoard = Object.assign(board, updateBoardDto);
    return this.boardRepository.save(updatedBoard);
  }

  async softDelete(id: number) {
    const board = await this.boardRepository.findOne({ where: { id, isDeleted: false } });
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
    const updateData: UpdateBoardDto = { isDeleted: true };
    return this.update(id, updateData);
  }
}
