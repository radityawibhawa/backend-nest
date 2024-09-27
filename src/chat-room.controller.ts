import { Body, Controller, Get, HttpStatus, Param, Post, Request, Res, UseGuards } from "@nestjs/common";
import { ChatRoomDocument } from "./chat-room.schema";
import { ChatRoomService } from "./chat-room.service";
import { CreateChatRoomDto } from "./DTO/create-chat-room.dto";
import { JwtAuthGuard } from "./JWTConfig/jwt-auth.guard";

@Controller('chat-rooms')
export class ChatRoomController {
    constructor(private readonly chatRoomService: ChatRoomService) {}

    @UseGuards(JwtAuthGuard)
    @Post('register')
    async create(@Body() createChatRoomDto: CreateChatRoomDto, @Request() req) {
        const userId = req.user.userId;
        return this.chatRoomService.create(createChatRoomDto, userId);
    }

    @Get('/get-chat-rooms')
    async getChatRooms() {
        const chatRooms: ChatRoomDocument[] = await this.chatRoomService.getChatRooms();
        return {
            statusCode: HttpStatus.OK,
            message: 'Chat rooms retrieved successfully',
            data: chatRooms.map(chatRoom => ({
                id: chatRoom._id.toString(),
                name: chatRoom.name,
                description: chatRoom.description,
            })),
        };
    }

    @Get('/get-members/:id')
    async getChatRoomMembers(@Param('id') id:string, @Res() res ){
        try{
            const members = await this.chatRoomService.getChatRoomMembers(id);
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'Members retrieved successfully',
                data: members,
            });
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).json({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'error.message',
                data: [],
            });
        }
    }

}