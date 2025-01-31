import { Module, OnModuleInit } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongoDbService } from "./mongoDb.service";
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import {Connection} from "mongoose";
(global as any).customCrypto = crypto;

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                const clusterName = configService.get<string>('mongoDb.clusterName');
                return {
                    uri: configService.getOrThrow<string>('mongoDb.url'),
                    autoIndex: true,
                    authSource: 'admin',
                    retryWrites: true,
                    dbName: configService.getOrThrow<string>('mongoDb.database'),
                    ...(clusterName ? { replicaSet: clusterName } : {}),
                };
            },
            inject: [ConfigService],
        }),
    ],
    providers: [MongoDbService],
})
export class MongoDbModule implements OnModuleInit {
    constructor(@InjectConnection() private connection: Connection,) {}

    async onModuleInit() {
        const client = this.connection.getClient();
        global.mongoConnection = client;
    }
}

