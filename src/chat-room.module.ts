import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ChatRoom, ChatRoomSchema } from "./chat-room.schema";
import { ChatRoomService } from "./chat-room.service";
import { ChatRoomController } from "./chat-room.controller";

@Module({
    imports: [MongooseModule.forFeature([{ name: ChatRoom.name, schema: ChatRoomSchema }])],
    providers: [ChatRoomService],
    controllers: [ChatRoomController],
})

export class ChatRoomModule {}