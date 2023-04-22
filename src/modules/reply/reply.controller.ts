import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { ResponseEntity } from '@root/common/domain/response.entity';

@Controller('replies')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Post()
  async create(@Body() createReplyDto: CreateReplyDto) {
    return ResponseEntity.OK_WITH(await this.replyService.create(createReplyDto));
  }

  @Get() //전체 댓글들 조회
  async findReplies() {
    return ResponseEntity.OK_WITH(await this.replyService.findAll());
  }

  @Get(':id') //게시글에 달린 댓글 중 하나 클릭 시 해당 댓글 내역 조회
  async findReply(@Param('id') id: number) {
    return ResponseEntity.OK_WITH(await this.replyService.findOne(id));
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateReplyDto: UpdateReplyDto) {
    return this.replyService.update(id, updateReplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.replyService.remove(id);
  }
}
