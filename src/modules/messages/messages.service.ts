import { Injectable } from '@nestjs/common';
import { SendTextMessageDTO } from './dto/sendTextMessage.dto';
import { RMQProducer } from 'src/infra/rmq.producer.service';
import { SendTextMenssageForAllContactsDTO } from './dto/sendTextMenssageForAllContacts.dto';
import { PrismaService } from 'src/infra/prisma.service';
import { RedisService } from 'src/infra/redis.service';


export interface SendTextMessageForAllContactsOutput {
    contacts: {
        contact: string,
        state: 'queue' | 'finalized'
    } []

}

@Injectable()
export class MessagesService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly rabbitProducerService: RMQProducer,
        private readonly redisService: RedisService
    ) {}

    async sendTextMessage(message: SendTextMessageDTO) {
        await this.rabbitProducerService.sendTextMenssageToQueue({
            contactNumber: message.contactNumber,
            messageCreated: new Date(),
            textMessage: message.textMessage
        })
    }

    async sendTextMessageForAllContacts(message: SendTextMenssageForAllContactsDTO): Promise<SendTextMessageForAllContactsOutput> {
        const contactsOrError = await this.prismaService.contacts.findMany()
        const toReturn = {
            contacts: []
        } as SendTextMessageForAllContactsOutput

        for(const contact of contactsOrError) {

            const contactState = await this.redisService.getContactState(contact.contactNumber)
            if(contactState) {
                toReturn.contacts.push({
                    contact: contact.contactNumber,
                    state: contactState
                })
                continue
            }

            await this.rabbitProducerService.sendTextMenssageToQueue({
                contactNumber: contact.contactNumber,
                messageCreated: new Date(),
                textMessage: message.textMessage
            })

            await this.redisService.addContactToProgressContacts(contact.contactNumber)
            toReturn.contacts.push({
                contact: contact.contactNumber,
                state: 'queue'
            })
        }

        return toReturn
    }
}
