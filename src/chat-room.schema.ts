import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ChatRoomDocument = ChatRoom & Document;

@Schema({ timestamps: true, collection: 'chatRooms' })
export class ChatRoom {
    @Prop({ unique:true })
    name: string;

    @Prop()
    description: string;

    @Prop([String])
    members: string[];
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom)