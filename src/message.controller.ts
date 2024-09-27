import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { MessageService } from "./message.service";

@Controller('messages')
export class MessageController{
    constructor(private readonly messageService: MessageService) {}

    @Post('send-chat')
    async sendMessage(@Body() body, @Res() res){
        const { chatRoomId, senderId, content } = body;
        try{
            const message = await this.messageService.sendMessage(chatRoomId, senderId, content);
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                message: 'Message send successfully',
                data: message,
            });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: error.message,
                data: null,
            });
        }
    }

    @Get('get-chat/:chatRoomId')
    async getChatMessages(@Param('chatRoomId') chatRoomId: string, @Res() res){
        try{
            const messages = await this.messageService.getChatMessages(chatRoomId);
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                message: 'Messages retrieved successfully',
                data: messages,
            });
        } catch(error){
            return res.status(HttpStatus.NOT_FOUND).json({
                statusCode: HttpStatus.NOT_FOUND,
                message: error.message,
                data: [],
            });
        }
    }
}