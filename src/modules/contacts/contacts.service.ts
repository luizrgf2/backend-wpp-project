import { HttpCode, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateManyContactsDTO } from './dto/createManyContacts.dto';
import { PrismaService } from 'src/infra/prisma.service';

@Injectable()
export class ContactsService {

    constructor(
        private readonly prismaService: PrismaService
    ){}

    async createManyContacts(input: CreateManyContactsDTO) {
        try{

            await this.prismaService.contacts.createMany({
                data: input.contacts.map(contact=>({
                     contactNumber: contact
                })),
                skipDuplicates: true
            })


        }catch(e) {
            Logger.error(e)
            throw new HttpException('Erro para criar contatos!', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
