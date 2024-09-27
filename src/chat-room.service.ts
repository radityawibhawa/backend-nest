import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ChatRoom, ChatRoomDocument } from "./chat-room.schema";
import { CreateChatRoomDto } from "./DTO/create-chat-room.dto";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class ChatRoomService {
    constructor(
        @InjectModel(ChatRoom.name) private chatRoomModel: Model<ChatRoomDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}
    

    async create(createChatRoomDto: CreateChatRoomDto, userId: string): Promise<{ statusCode: number, message: string }> {
        const createdChatRoom = new this.chatRoomModel({
            ...createChatRoomDto,
            members: [userId],
        });

        await createdChatRoom.save();

        return {
            statusCode: 201,
            message: 'Chat Room Created Successfully'
        };
    }

    async getChatRooms(): Promise<ChatRoomDocument[]> {
        return this.chatRoomModel.find().exec();
    }

    async addMember(id: string, userId: string): Promise<{ statusCode: number, message: string }>{
        const chatRoom = await this.chatRoomModel.findById(id);
        if (!chatRoom) {
            throw new NotFoundException('Chat room not found');
        }
        if (chatRoom.members.includes(userId)) {
            return { statusCode: 400, message: 'User already joined' };
        }
        chatRoom.members.push(userId);
        await chatRoom.save();
        return { statusCode: 200, message: 'User successfully added to chat room' };
    }

    async getChatRoomMembers(chatRoomId: string){
        const chatRoom = await this.chatRoomModel.findById(chatRoomId).exec();
        if(!chatRoom) {
            throw new NotFoundException('Chat room not found');
        }

        const members = await this.userModel.find({
            _id: { $in: chatRoom.members },
        }).select('username').exec();

        return members.map(member => ({ username: member.username }));
    }
}
