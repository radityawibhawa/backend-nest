import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type MessageDocument = Message & Document;

@Schema({ timestamps: true, collection: 'messages' })
export class Message {
    @Prop({ type: Types.ObjectId, ref: 'ChatRoom' })
    chatRoomId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User' })
    senderId: Types.ObjectId;

    @Prop()
    content: string;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
