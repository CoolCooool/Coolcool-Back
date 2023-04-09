import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '@root/modules/user/dto/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
