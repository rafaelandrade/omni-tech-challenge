import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidV4 } from 'uuid';
import mongoose from "mongoose";

@Schema({
    timestamps: true,
    toObject: {
        transform: function (_doc: any, ret) {
            delete ret._id;
            delete ret.__v;
            ret.id = _doc.id;
            ret.customerId = _doc.customerId;
        },
    },
    toJSON: {
        transform: function (_doc: any, ret) {
            delete ret._id;
            delete ret.__v;
            ret.id = _doc.id;
            ret.customerId = _doc.customerId;
        },
    },
})
export class User<T = any> {
    @Prop({
        type: mongoose.Schema.Types.UUID,
        default: () => uuidV4(),
        virtual: 'id',
    })
    _id: string;
    id: string;

    @Prop({ required: () => true, type: String })
    email: string;

    @Prop({ required: () => true })
    password: string;

    @Prop({ required: () => true, type: String })
    username: string;

    @Prop({ required: () => true, type: String })
    birthdate: string;

    @Prop({ default: () => new Date() })
    createdAt: Date;

    @Prop({ default: () => new Date() })
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);