import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SendTextMessageDTO } from './dto/sendTextMessage.dto';
import { MessagesService } from './messages.service';
import { SendTextMenssageForAllContactsDTO } from './dto/sendTextMenssageForAllContacts.dto';

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

    @HttpCode(HttpStatus.OK)
    @Post('send/text/many')
    async sendTextMessageForAllContacts(@Body() input: SendTextMenssageForAllContactsDTO) {
        await this.messagesService.sendTextMessageForAllContacts(input)
    }
}
