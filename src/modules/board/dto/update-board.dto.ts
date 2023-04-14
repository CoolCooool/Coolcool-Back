import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { IsBoolean } from 'class-validator';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @IsBoolean()
  isDeleted: boolean; // board title
}
