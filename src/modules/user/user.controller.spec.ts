import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import { setGlobalNestApp } from '@root/common/config/set-global-nests-app';

describe('UserController', () => {
  let app: INestApplication;
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    app = module.createNestApplication();
    controller = module.get<UserController>(UserController);

    setGlobalNestApp(app); // ClassSerializerInterceptor 적용
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
