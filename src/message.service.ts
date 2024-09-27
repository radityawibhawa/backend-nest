import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message, MessageDocument } from "./message.schema";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class MessageService{
    constructor(
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async sendMessage(chatRoomId: string, senderId: string, content: string): Promise<Message> {
        const newMessage = new this.messageModel({
            chatRoomId,
            senderId,
            content,
        });
        return newMessage.save();
    }

    async getChatMessages(chatRoomId: string){
        const messages = await this.messageModel.find({ chatRoomId }).sort({ createdAt:1 }).exec();
        if (!messages.length){
            throw new NotFoundException('No messages found for this chat room');
        }

        const userIds = messages.map(message => message.senderId);
        const users = await this.userModel.find({ _id: { $in: userIds } }).select('username').exec();
        const userMap: { [key: string]: string } = {}; 

        users.forEach(user => {
            userMap[user._id.toString()] = user.username as string; 
        });

        return messages.map(message => ({
            senderId : message.senderId,
            username : userMap[message.senderId.toString()],
            content: message.content,
            createdAt: message.createdAt,
        }));
    }
}