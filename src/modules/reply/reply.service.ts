import { Injectable } from '@nestjs/common';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { Reply } from '@root/modules/reply/entity/reply.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReplyNotFoundException } from '@root/modules/reply/exception/reply-not-found.exception';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply)
    private readonly replyRepository: Repository<Reply>,
  ) {}

  async create(createReplyDto: CreateReplyDto) {
    const reply: Reply = this.replyRepository.create({
      content: createReplyDto.content,
      userId: createReplyDto.userId,
    });
    try {
      return await this.replyRepository.insert(reply);
    } catch (err) {
      throw new Error(`Failed to create reply: ${err.message}`);
    }
  }

  async findAll() {
    const replies: Reply[] = await this.replyRepository.find();
    if (replies.length === 0) {
      throw new ReplyNotFoundException();
    }
    return replies;
  }

  async findOne(id: number) {
    const reply: Reply = await this.replyRepository.findOne({ where: { id } });
    if (reply === null) {
      throw new ReplyNotFoundException();
    }
    return reply;
  }

  update(id: number, updateReplyDto: UpdateReplyDto) {
    return `This action updates a #${id} reply`;
  }

  remove(id: number) {
    return this.replyRepository.delete(id);
  }
}
