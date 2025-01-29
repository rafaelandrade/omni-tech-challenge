import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

@Injectable()
export class MongoDbService {
    constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

    getDbHandle(): DataSource {
        return this.dataSource;
    }
}