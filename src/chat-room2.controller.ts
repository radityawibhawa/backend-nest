import { Body, Controller, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ChatRoomService } from './chat-room.service';
import { JwtAuthGuard } from './JWTConfig/jwt-auth.guard';

@Controller('chat-rooms')
export class ChatRoomController2 {
  constructor(private readonly chatRoomService: ChatRoomService) {}

  @UseGuards(JwtAuthGuard)
  @Put('insert')
  async insertMember(@Body('id') id: string, @Req() req: Request) {
    console.log('User:', req.user); 
    const userId = req.user?.userId; 
    return this.chatRoomService.addMember(id, userId);
  }
}
