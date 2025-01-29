import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {setMiddleware} from "./infra/infra.helpers";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setMiddleware(app)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
