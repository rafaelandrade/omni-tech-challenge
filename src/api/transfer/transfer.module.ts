import {Module} from "@nestjs/common";
import {TransferController} from "./transfer.controller";
import {TransferService} from "./transfer.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Balance, BalanceSchema, Transfer, TransferSchema, User, UserSchema} from "../auth/schemas";


@Module({
    imports: [
        MongooseModule.forFeature([
        {
            name: User.name,
            schema: UserSchema,
        },
        {
            name: Transfer.name,
            schema: TransferSchema
        },
        {
            name: Balance.name,
            schema: BalanceSchema
        }
    ]),
    ],
    providers: [TransferService],
    controllers: [TransferController],
    exports: [TransferService]
})
export class TransferModule {}