import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserService } from "src/user.service";

@Controller('auth')
export class AuthController{
    constructor(
        private authService : AuthService,
        private userService : UserService
    ) {}

    @Post('login')
    async login(@Body() loginDto: { username: string, password: string }){
        const user = await this.authService.validateUser(loginDto.username, loginDto.password);
        if (!user){
            throw new UnauthorizedException('Invalid credentials');
        }

        return this.authService.login(user);
    }
}