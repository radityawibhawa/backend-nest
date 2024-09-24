import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user.module';
import { AuthModule } from './JWTConfig/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './JWTConfig/jwt.strategy';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/ChatApp79'),
    UserModule,
    AuthModule,
    PassportModule,
    JwtModule.register({
      secret:'SRG9LOmPZk',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
