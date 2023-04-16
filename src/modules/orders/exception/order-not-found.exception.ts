import { HttpException, HttpStatus } from '@nestjs/common';

export class OrderNotFoundException extends HttpException {
  constructor() {
    super('해당 주문을 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
  }
}
