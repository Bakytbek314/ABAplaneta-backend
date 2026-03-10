import 'tsconfig-paths/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; // <= ВАЖНО!
import { join } from 'path';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.use(bodyParser.json({ limit: "50mb" }));

  app.useStaticAssets(join(__dirname, '..', 'static'), {
    prefix: '/',
  });

  await app.listen(5000);
}
bootstrap();