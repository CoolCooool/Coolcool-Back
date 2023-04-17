import { IsNumber, IsString } from 'class-validator';

export class CreateBoardDto {
  //id, createdAt, updatedAt 는 없어도 된다. -> 애플리케이션 내부적으로 결정되기 때문이다
  @IsString()
  contents: string; // board contents

  @IsString()
  title: string; // board title

  @IsNumber()
  userId: number; // user name

  @IsNumber()
  categoryId: number; // category name (id)
}
