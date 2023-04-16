import { HttpException, HttpStatus } from '@nestjs/common';

export class BoardNotFoundException extends HttpException {
  constructor() {
    super('해당 게시글을 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
  }
}
