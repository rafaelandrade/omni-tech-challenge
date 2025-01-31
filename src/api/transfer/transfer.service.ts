import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Balance, Transfer, TransfersTypes, User } from '../auth/schemas';
import { Model } from 'mongoose';
import { CatchHandler } from '../../exceptions';
import { DepositDto, WithdrawalDto } from './dto';
import { UserNotExistException } from '../auth/exceptions/UserNotExist.exception';

@Injectable()
export class TransferService {
  constructor(
    @InjectModel(User.name) private user: Model<User>,
    @InjectModel(Transfer.name) private transfer: Model<Transfer>,
    @InjectModel(Balance.name) private balance: Model<Balance>,
  ) {}

  @CatchHandler()
  async deposit(body: DepositDto) {
    const { email, amount } = body;

    const user = await this.user.findOne({ email });
    if (!user) throw new UserNotExistException(email);

    const oldBalance = await this.balance.findOne({ userId: user._id });

    const balance = await this.balance.findOneAndUpdate(
      { userId: user._id },
      { amount: oldBalance.amount + amount },
      { new: true },
    );

    await this.transfer.create({ fromUser: user._id, amount, type: TransfersTypes.DEPOSIT });

    return { message: 'Deposit done!', amount: balance.amount, email: user.email };
  }

  @CatchHandler()
  async withdrawal(body: WithdrawalDto) {
    const { fromEmail, toEmail, amount } = body;

    const [fromUser, toUser] = await Promise.all([
      await this.user.findOne({ email: fromEmail }),
      await this.user.findOne({ email: toEmail }),
    ]);

    if (!fromUser || !toUser) throw new Error('User not found!');

    const [fromBalance, toBalance] = await Promise.all([
      await this.balance.findOne({ userId: fromUser._id }),
      await this.balance.findOne({ userId: toUser._id }),
    ]);

    if (fromBalance.amount < amount) throw new Error(`Balance not enough! Amount Available: ${fromBalance}`);

    const [fromUserBalance] = await Promise.all([
      await this.balance.findOneAndUpdate({ userId: fromUser._id }, { amount: fromBalance.amount - amount }),
      await this.balance.findOneAndUpdate({ userId: toUser._id }, { amount: toBalance.amount + amount }),
      await this.transfer.create({
        fromUser: fromUser._id,
        toUser: toUser._id,
        amount,
        type: TransfersTypes.WITHDRAWAL,
      }),
        await this.transfer.create({
            fromUser: toUser._id,
            amount,
            type: TransfersTypes.DEPOSIT,
        }),
    ]);

    return { message: 'Withdrawal finish!', balanceAvailable: fromUserBalance.amount, user: fromUser.email }
  }

  @CatchHandler()
  async getBalance(email: string) {
    const user = await this.user.findOne({ email })
      if (!user) throw new UserNotExistException(email);

      const balance = await this.balance.findOne({ userId: user._id })

      return { email: user.email, balance: balance.amount }
  }

  @CatchHandler()
  async getTransfer(email: string) {
      const user = await this.user.findOne({ email })
      if (!user) throw new UserNotExistException(email);

      const transfers = await this.transfer.find({ fromUser: user._id })

      const allTransfers = transfers.map(transfer => {
          return {
              originUser: transfer.fromUser,
              destinationUser: transfer?.toUser,
              type: transfer.type,
              amount: transfer.amount,
              createdAt: transfer.createdAt,
              updatedAt: transfer.updatedAt
          }
      })

      return {
          transfers: allTransfers
      }
  }
}