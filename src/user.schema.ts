import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
@Schema({ collection: 'users' })
export class User {

    @Prop({ unique: true })
    username: String;
    
    @Prop({ unique: true })
    email: String;

    @Prop({ unique: true })
    password: String;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);