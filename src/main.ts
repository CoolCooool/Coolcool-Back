import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setGlobalNestApp } from '@root/common/config/set-global-nests-app';
import { setupSwagger } from '@root/common/util/swagger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Middleware 설정 -> Cors 속성 활성화
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  setGlobalNestApp(app);

  // Swagger 환경설정 연결
  setupSwagger(app);

  await app.listen(process.env.port || 6000);
}

bootstrap();
