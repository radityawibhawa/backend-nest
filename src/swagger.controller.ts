import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Chat')
@Controller('Chat')
export class ChatController{
    @Get()
    @ApiOperation({ summary: 'Get All Messages' })
    @ApiResponse({ status: 200, description: 'Return all messages.' })
    getAllMessage(){
        return[]
    }
}