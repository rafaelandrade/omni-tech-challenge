import { Module } from '@nestjs/common';
import {InfraModule} from "./infra/infra.module";
import {MongoDbModule} from "./database/mongoDb/mongoDb.module";
import {AuthModule} from "./api";

@Module({
  imports: [InfraModule, MongoDbModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
