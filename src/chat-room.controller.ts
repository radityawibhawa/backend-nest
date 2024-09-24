import { Controller, Post, Body, UseGuards, Request } from "@nestjs/common";
import { ChatRoomService } from "./chat-room.service";
import { CreateChatRoomDto } from "./DTO/create-chat-room.dto";
import { JwtAuthGuard } from "./JWTConfig/jwt-auth.guard";

@Controller('chat-rooms')
export class ChatRoomController{
    constructor(private readonly chatRoomService: ChatRoomService){}

    @UseGuards(JwtAuthGuard)
    @Post('register')
    async create(@Body() createChatRoomDto: CreateChatRoomDto, @Request() req) {
        const userId = req.user.userId;
        return this.chatRoomService.create(createChatRoomDto, userId);
    }
}