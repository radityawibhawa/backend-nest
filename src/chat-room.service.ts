import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ChatRoom, ChatRoomDocument } from "./chat-room.schema";
import { CreateChatRoomDto } from "./DTO/create-chat-room.dto";

@Injectable()
export class ChatRoomService {
    constructor(@InjectModel(ChatRoom.name) private chatRoomModel: Model<ChatRoomDocument>) {}

    async create(createChatRoomDto: CreateChatRoomDto, userId: string): Promise<{ statusCode: number, message: string }> {
        const createdChatRoom = new this.chatRoomModel({
            ...createChatRoomDto,
            members: [userId],
        });

        await createdChatRoom.save();

        return{
            statusCode: 201,
            message: 'Chat Room Created Successfully'
        };
    }
}