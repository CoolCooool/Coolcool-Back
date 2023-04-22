import { HttpException, HttpStatus } from '@nestjs/common';

export class ReplyNotFoundException extends HttpException {
  constructor() {
    super('해당 댓글을 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
  }
}
