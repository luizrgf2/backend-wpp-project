import { Injectable } from '@nestjs/common';
import { SendTextMessageDTO } from './dto/sendTextMessage.dto';
import { RMQProducer } from 'src/infra/rmq.producer.service';
import { SendTextMenssageForAllContactsDTO } from './dto/sendTextMenssageForAllContacts.dto';
import { PrismaService } from 'src/infra/prisma.service';

@Injectable()
export class MessagesService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly rabbitProducerService: RMQProducer
    ) {}

    async sendTextMessage(message: SendTextMessageDTO) {
        await this.rabbitProducerService.sendTextMenssageToQueue({
            contactNumber: message.contactNumber,
            messageCreated: new Date(),
            textMessage: message.textMessage
        })
    }

    async sendTextMessageForAllContacts(message: SendTextMenssageForAllContactsDTO) {
        const contactsOrError = await this.prismaService.contacts.findMany()

        for(const contact of contactsOrError) {

            await this.rabbitProducerService.sendTextMenssageToQueue({
                contactNumber: contact.contactNumber,
                messageCreated: new Date(),
                textMessage: message.textMenssage
            })
        }

    }
}
