import { Enum, EnumType } from 'ts-jenum';

@Enum('_code')
export class BoardType extends EnumType<BoardType>() {
  static readonly USERID = new BoardType(1);

  static readonly CATEGORYID = new BoardType(3);

  static readonly BOARDID = new BoardType(2);

  private constructor(readonly _code: number) {
    super();
  }
}
