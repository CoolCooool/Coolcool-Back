import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setGlobalNestApp } from '@root/common/config/set-global-nests-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  setGlobalNestApp(app);
  await app.listen(process.env.port || 6000);
}

bootstrap();
