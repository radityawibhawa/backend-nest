import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type ChatRoomDocument = ChatRoom & Document & { _id: Types.ObjectId };

@Schema({ timestamps: true, collection: 'chatRooms' })
export class ChatRoom {
    @Prop({ unique: true })
    name: string;

    @Prop()
    description: string;

    @Prop([String])
    members: string[];
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
