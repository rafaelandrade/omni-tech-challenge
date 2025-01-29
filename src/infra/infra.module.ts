import {Module} from "@nestjs/common";
import {EnvModule} from "../env/env.module";
import {MongoDbModule} from "../database/mongoDb/mongoDb.module";
import {LoggerService} from "../utils/logger.helper";


@Module({
    imports: [EnvModule, MongoDbModule],
    providers: [
        LoggerService,
    ],
    exports: [LoggerService]
})
export class InfraModule {}