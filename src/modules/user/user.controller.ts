import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { User } from '@root/modules/user/entity/user.entity';
import { UserResponseDto } from '@root/modules/user/dto/user.response.dto';
import { UserNotFoundException } from '@root/modules/user/exception/user-not-found.exception';
import { ResponseEntity } from '@root/common/domain/response.entity';
import { UserService } from '@root/modules/user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/user/:id')
  async findById(@Param('id') id: number) {
    try {
      return ResponseEntity.OK_WITH(new UserResponseDto(await this.userService.findById(id)));
    } catch (e) {
      throw new UserNotFoundException();
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
