import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { UserService } from "src/user.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        console.log(user); 
        const userId = user._doc._id.toString(); 
        const payload = { username: user._doc.username, sub: userId }; 
        console.log(payload); 
        return {
            statusCode: 200,
            message: 'Login Successful',
            jwt: this.jwtService.sign(payload), 
        };
    }    
}