import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatRoomController } from './chat-room.controller';
import { ChatRoomModule } from './chat-room.module';
import { ChatRoom, ChatRoomSchema } from './chat-room.schema';
import { ChatRoomService } from './chat-room.service';
import { ChatGateway } from './ChatWebsocket/chat.gateway';
import { AuthModule } from './JWTConfig/auth.module';
import { JwtStrategy } from './JWTConfig/jwt.strategy';
import { LoggingMiddleware } from './logging/logging.middleware';
import { MessageModule } from './message.module';
import { UserModule } from './user.module';
import { User, UserSchema } from './user.schema';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/ChatApp'),
    UserModule,
    AuthModule,
    MessageModule,
    PassportModule,
    ChatRoomModule,
    JwtModule.register({
      secret: 'SRG9LOmPZk',
      signOptions: { expiresIn: '60m' },
    }),
    MongooseModule.forFeature([{ name: ChatRoom.name, schema: ChatRoomSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController, ChatRoomController],
  providers: [AppService, JwtStrategy, ChatGateway, ChatRoomService],
  
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}