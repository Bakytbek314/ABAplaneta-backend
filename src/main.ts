import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import *as bodyParser from 'body-parser';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.useStaticAssets(join(__dirname, '..', 'static'), {
    prefix: '/',
  });
  await app.listen(5000);
}
bootstrap();