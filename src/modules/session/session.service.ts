import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateSessionDTO } from './dto/createSession.dto';
import { RMQSessionControllerProducer } from 'src/infra/rmq.session.controller.producer.service';

@Injectable()
export class SessionService {

    constructor(
        private readonly rmqProducer: RMQSessionControllerProducer
    ){}

    async createSession(input: CreateSessionDTO) {
        try{
            await this.rmqProducer.sendTextMenssageToQueue(input)
        }catch(e){
            Logger.error(e)
            throw new HttpException('Erro para enviar a sessão para a fila!', 500)
        }
    }
}
