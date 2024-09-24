import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./user.schema";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from "./DTO/create-user.dto";

@Injectable()
export class UserService{
    constructor(@InjectModel(User.name) private userModel : Model<UserDocument>){}

    async create(createUserDTO: CreateUserDTO): Promise<{ statusCode: number, message: string }>{
        const { username, email, password } = createUserDTO;
        const existingUser = await this.userModel.findOne({ $or: [{ username }, { email }] }).exec();
        if (existingUser) {
            throw new ConflictException('Username or Email already exist')
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = new this.userModel({
            username,
            email,
            password: hashedPassword
        });

        await createdUser.save();

        return{
            statusCode: 201,
            message: 'User Registered Successfully'
        };
    }

    async findOne(username: string): Promise<User | undefined>{
        return this.userModel.findOne({ username }).exec();
    }
}