import { Module } from '@nestjs/common';
import {InfraModule} from "./infra/infra.module";
import {MongoDbModule} from "./database/mongoDb/mongoDb.module";
import {AuthModule} from "./api";
import {TransferModule} from "./api/transfer/transfer.module";

@Module({
  imports: [InfraModule, MongoDbModule, AuthModule, TransferModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
