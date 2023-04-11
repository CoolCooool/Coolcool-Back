import { Column } from 'typeorm';

export class CreateBoardDto {
  //id, createdAt, updatedAt 는 없어도 된다. -> 애플리케이션 내부적으로 결정되기 때문이다
  contents: string; // board contents

  likes: number; // number of likes

  title: string; // board title

  userId: number; // user name

  categoryId: number; // category name (id)

  isDeleted: boolean; //
}
