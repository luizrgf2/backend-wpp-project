import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDTO } from './dto/createSession.dto';

@Controller('session')
export class SessionController {
    constructor(
        private readonly sessionService: SessionService
    ){}

    @Post()
    @HttpCode(HttpStatus.OK)
    async createSession(@Body() input: CreateSessionDTO) {
        await this.sessionService.createSession(input)
    }
}
