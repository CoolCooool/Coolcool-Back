import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from '@root/modules/board/entity/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { BoardNotFoundException } from '@root/modules/board/exception/board-not-found.exception';
import { BoardType } from '@root/modules/board/entity/boardCategory.enum';
import { CreateReplyDto } from '@root/modules/reply/dto/create-reply.dto';
import { Reply } from '@root/modules/reply/entity/reply.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(Reply)
    private replyRepository: Repository<Reply>,
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<InsertResult> {
    const board: Board = this.boardRepository.create(createBoardDto);
    try {
      return await this.boardRepository.insert(board);
    } catch (error) {
      throw new Error(`Failed to create board: ${error.message}`);
    }
  }

  async findAll(query?): Promise<Board[]> {
    const boards: Board[] = await this.boardRepository.find(query && { where: query });
    if (boards.length === 0) {
      throw new BoardNotFoundException();
    }
    return boards;
  }

  async findByUserId(userId: number): Promise<Board[]> {
    return this.findAll({ userId });
  }

  async findByBoardId(boardId: number): Promise<Board> {
    return this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['replies'],
    });
  }

  async findByCategoryId(categoryId: number): Promise<Board[]> {
    return this.findAll({ categoryId });
  }

  async findBy(id: number, idType: number) {
    switch (idType) {
      case BoardType.USERID._code:
        return this.findByUserId(id);
      case BoardType.BOARDID._code:
        return this.findByBoardId(id);
      case BoardType.CATEGORYID._code:
        return this.findByCategoryId(id);
      default:
        throw new Error('Invalid id type');
    }
  }

  async findByQuestion(question: string): Promise<Board[]> {
    const boards: Board[] = await this.boardRepository
      .createQueryBuilder('board')
      .where('board.contents LIKE :keyword', { keyword: `%${question}%` })
      .getMany();
    if (boards.length === 0) {
      throw new BoardNotFoundException();
    }
    return boards;
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    const board = await this.boardRepository.findOne({ where: { id } });
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
    const updatedBoard = Object.assign(board, updateBoardDto);
    return this.boardRepository.save(updatedBoard);
  }

  async softDelete(id: number) {
    const board = await this.boardRepository.findOne({ where: { id } });
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
    await this.boardRepository.softDelete(id);
  }

  async restore(id: number) {
    return this.boardRepository.createQueryBuilder('board').restore().where('id = :id', { id: id }).execute();
  }

  async hardDelete(id: number) {
    return this.boardRepository.delete(id);
  }

  async updateReply(reply: CreateReplyDto) {
    const board = await this.findBy(reply.boardId, 2);
    const newReply = new Reply();
    newReply.board = board[0];
    newReply.content = reply.content;
    newReply.userId = reply.userId;
    await this.replyRepository.save(newReply);
    return board;
  }
}
