import { HttpException, HttpStatus } from '@nestjs/common';

export class BoardNotFoundException extends HttpException {
  constructor() {
    super('해당 게시글을 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
  }
}

export class BoardNotCreatedException extends HttpException {
  constructor() {
    super('게시글 등록에 실패했습니다.', HttpStatus.NOT_FOUND);
  }
}
