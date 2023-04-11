import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BadRequestException, ParseIntPipe } from '@nestjs/common';
import { ResponseEntity } from '@root/common/domain/response.entity';
import { BoardNotCreatedException } from '@root/modules/board/exception/board-not-found.exception';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    try {
      return ResponseEntity.OK_WITH(this.boardsService.create(createBoardDto));
    } catch (e) {
      throw new BoardNotCreatedException();
    }
  }

  @Get() //return all boards
  getBoards() {
    console.log('get all community board\n');
    return this.boardsService.findAll();
  }

  @Get('/board')
  async findByIdAndType(@Query('id', ParseIntPipe) id: number, @Query('idType', ParseIntPipe) idType: number) {
    try {
      console.log('id and type input!!\n');
      return await this.boardsService.findBy(id, idType);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException('Invalid input queries');
      } else {
        throw error;
      }
    }
  }

  @Get('search')
  async findBySearches(@Query('question') question: string) {
    try {
      console.log('query for search!!\n');
      return await this.boardsService.findByQuestion(question);
    } catch (error) {
      throw new BadRequestException('Invalid input queries');
    }
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBoardDto: UpdateBoardDto) {
    console.log('I will update entity');
    return this.boardsService.update(id, updateBoardDto);
  }

  @Put('/delete/:id')
  delete(@Param('id') id: number) {
    console.log('I will SOFT DELETE');
    return this.boardsService.softDelete(id);
  }
}
