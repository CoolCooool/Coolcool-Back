import { IsArray, IsNumber, IsString } from 'class-validator';
import { Reply } from '@root/modules/reply/entity/reply.entity';

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

  // @IsArray() // 인풋으로 안들어오니까 그라재
  // replies: Reply[];
}
