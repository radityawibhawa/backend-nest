import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MessageController } from "./message.controller";
import { Message, MessageSchema } from "./message.schema";
import { MessageService } from "./message.service";
import { User, UserSchema } from "./user.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [MessageController],
    providers: [MessageService],
})

export class MessageModule{}