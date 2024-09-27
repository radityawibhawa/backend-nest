import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ChatRoomController } from "./chat-room.controller";
import { ChatRoom, ChatRoomSchema } from "./chat-room.schema";
import { ChatRoomService } from "./chat-room.service";
import { ChatRoomController2 } from "./chat-room2.controller";
import { UserModule } from "./user.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: ChatRoom.name, schema: ChatRoomSchema }]),
        UserModule,
    ],
    providers: [ChatRoomService],
    controllers: [ChatRoomController, ChatRoomController2],
})

export class ChatRoomModule {}