import { Module, OnModuleInit } from "@nestjs/common";
import { InjectDataSource, TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { MongoDbService } from "./mongoDb.service";
import * as crypto from 'crypto';
(global as any).crypto = crypto;

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    type: 'mongodb',
                    url: configService.get<string>('mongoDb.url'),
                    database: configService.getOrThrow<string>('mongoDb.database'),
                    useUnifiedTopology: true,
                    useNewUrlParser: true,
                    synchronize: true,
                    logging: true,
                };
            },
        }),
    ],
    providers: [MongoDbService],
    exports: [MongoDbService]
})
export class MongoDbModule implements OnModuleInit {
    constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

    async onModuleInit() {
        console.log("MongoDB Connected!");
        global.mongoConnection = this.dataSource;
    }
}
