import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {setMiddleware} from "./infra/infra.helpers";
import {set} from "mongoose";
import {customLogger} from "./utils/logger.helper";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  set('debug', (collectionName, methodName, methodArgs) =>
      customLogger.info(`Mongoose - ${collectionName} (${methodName})`, JSON.stringify(methodArgs)),
  );
  const app = await NestFactory.create(AppModule);

  setMiddleware(app)

  const configService = app.get<ConfigService>(ConfigService);

  await app.listen(configService.get('PORT'));
}
bootstrap();
