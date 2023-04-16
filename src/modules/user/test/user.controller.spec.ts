import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '@root/modules/user/user.controller';
import { UserService } from '@root/modules/user/user.service';
import { getPgTestTypeTrmModule } from '@root/common/config/get-pg-test-type-trm-module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@root/modules/user/entity/user.entity';
import { instance, mock, when } from 'ts-mockito';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [getPgTestTypeTrmModule(), TypeOrmModule.forFeature([User])],
      controllers: [UserController],
      providers: [UserService],
    }).compile();
    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('users', () => {
    it('findUserById', async () => {
      const id = 1;
      const user = new User();
      user.id = id;

      const stubUserApiService: UserService = mock(UserService);
      when(stubUserApiService.findAll()).thenResolve([user]);

      controller = new UserController(instance(stubUserApiService));

      const users = await controller.getUsers();
      expect(users).toHaveLength(id);
      expect(users[0].id).toBe(id);
    });
  });
});
