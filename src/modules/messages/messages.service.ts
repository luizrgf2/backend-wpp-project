import { Injectable } from '@nestjs/common';
import { SendTextMessageDTO } from './dto/sendTextMessage.dto';
import { RMQProducer } from 'src/infra/rmq.producer.service';

@Injectable()
export class MessagesService {

    constructor(
        private readonly rabbitProducerService: RMQProducer
    ) {}

    async sendTextMessage(message: SendTextMessageDTO) {
        await this.rabbitProducerService.sendTextMenssageToQueue({
            contactNumber: message.contactNumber,
            messageCreated: new Date(),
            textMessage: message.textMessage
        })
    }
}
