import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./DTO/create-user.dto";

@Controller('register')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
    async create(@Body() createUserDTO : CreateUserDTO ){
        return this.userService.create(createUserDTO);
    }
}