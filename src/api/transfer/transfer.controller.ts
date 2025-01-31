import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {customLogger} from "../../utils/logger.helper";
import {TransferService} from "./transfer.service";
import {DepositDto, WithdrawalDto} from "./dto";


@Controller('transfer')
export class TransferController {
    logger = customLogger;

    constructor(private transferService: TransferService) {}

    @Post('deposit')
    async deposit(@Body() body: DepositDto) {
        this.logger.info('Executing a DEPOSIT with follow body: ', body)
        return await this.transferService.deposit(body)
    }

    @Post('/')
    async withdrawal(@Body() body: WithdrawalDto) {
        this.logger.info('Executing a WITHDRAWAL with follow body: ', body)
        return await this.transferService.withdrawal(body)
    }

    @Get('/:email/balance')
    async getBalance(@Param('email') email: string) {
        this.logger.info('Getting a BALANCE for follow email: ', email)
        return await this.transferService.getBalance(email)
    }

    @Get('/:email')
    async getTransfers(@Param('email') email) {
        this.logger.info('Getting all Transfers for follow email: ', email)
        return await this.transferService.getTransfer(email)
    }
}