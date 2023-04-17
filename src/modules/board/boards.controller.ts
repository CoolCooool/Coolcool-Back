import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, NotFoundException } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BadRequestException, ParseIntPipe } from '@nestjs/common';
import { ResponseEntity } from '@root/common/domain/response.entity';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    return ResponseEntity.OK_WITH(await this.boardsService.create(createBoardDto));
  }

  @Get() //return all boards
  async getBoards() {
    return ResponseEntity.OK_WITH(await this.boardsService.findAll({}));
  }

  @Get('/board')
  async findByIdAndType(@Query('id', ParseIntPipe) id: number, @Query('idType', ParseIntPipe) idType: number) {
    return ResponseEntity.OK_WITH(await this.boardsService.findBy(id, idType));
  }

  @Get('search')
  async findBySearches(@Query('question') question: string) {
    return ResponseEntity.OK_WITH(await this.boardsService.findByQuestion(question));
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateBoardDto: UpdateBoardDto) {
    return ResponseEntity.OK_WITH(await this.boardsService.update(id, updateBoardDto));
  }

  @Put('/delete/:id')
  async delete(@Param('id') id: number) {
    return ResponseEntity.OK_WITH(await this.boardsService.softDelete(id));
  }

  @Put('/restore/:id')
  async restore(@Param('id') id: number) {
    return ResponseEntity.OK_WITH(await this.boardsService.restore(id));
  }

  @Delete('/delete/:id')
  async hardDelete(@Param('id') id: number) {
    return ResponseEntity.OK_WITH(await this.boardsService.hardDelete(id));
  }
}
