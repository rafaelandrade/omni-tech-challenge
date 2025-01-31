import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { v4 as uuidV4 } from 'uuid';

export enum TransfersTypes {
    DEPOSIT = 'DEPOSIT',
    WITHDRAWAL = 'WITHDRAWAL',
}

@Schema({
    collection: 'transfers',
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
export class Transfer {
    @Prop({
        type: mongoose.Schema.Types.UUID,
        default: () => uuidV4(),
        virtual: 'id',
    })
    _id: string;
    id: string;

    @Prop({ type: mongoose.Schema.Types.UUID, required: true })
    fromUser: string;

    @Prop({ type: mongoose.Schema.Types.UUID, required: false })
    toUser: string;

    @Prop({ type: Number, required: true })
    amount: string;

    @Prop({ type: String, enum: TransfersTypes, required: true })
    type: TransfersTypes

    createdAt: Date;

    updatedAt: Date;
}

export const TransferSchema = SchemaFactory.createForClass(Transfer);
