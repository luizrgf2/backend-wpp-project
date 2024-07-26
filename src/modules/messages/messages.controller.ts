import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SendTextMessageDTO } from './dto/sendTextMessage.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {

    constructor(
        private readonly messagesService: MessagesService
    ){}

    @HttpCode(HttpStatus.OK)
    @Post('send/text')
    async sendTextMessage(@Body() input: SendTextMessageDTO) {
        await this.messagesService.sendTextMessage(input)
    }
}
