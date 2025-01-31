import { Injectable } from "@nestjs/common";
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class MongoDbService {
    constructor(@InjectConnection() private readonly connection: Connection) {}
    getDbHandle(): Connection {
        return this.connection;
    }
}