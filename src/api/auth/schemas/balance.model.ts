import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

@Schema({
    collection: 'balances',
    timestamps: true,
    toObject: {
        transform: function (_doc: any, ret) {
            delete ret._id;
            delete ret.__v;
            ret.id = _doc.id;
        },
    },
    toJSON: {
        transform: function (_doc: any, ret) {
            delete ret._id;
            delete ret.__v;
            ret.id = _doc.id;
        },
    },
})
export class Balance {
    @Prop({
        type: mongoose.Schema.Types.UUID,
        default: () => uuidV4(),
        virtual: 'id',
    })
    _id: string;
    id: string;

    @Prop({ type: mongoose.Schema.Types.UUID, required: true })
    userId: string;

    @Prop({ type: Number, required: true })
    amount: number;

    createdAt: Date;

    updatedAt: Date;
}

export const BalanceSchema = SchemaFactory.createForClass(Balance);
