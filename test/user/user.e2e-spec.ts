import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common/interfaces/nest-application.interface';
import * as request from 'supertest';
import { AppModule } from '@root/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/users', () => {
    it('GET', async () => {
      const response = await request(app.getHttpServer()).get('/user/1');
      expect(response.status).toBe(404);
      // expect(response.status).toBe(200);
      // const body: ResponseEntity<UserResponseDto> = response.body;
      // const data = body.data;
      // expect(data.userName).toBe('testuser');
    });
  });
});
