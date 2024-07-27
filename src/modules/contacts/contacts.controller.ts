import { Body, Controller, Delete, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateManyContactsDTO } from './dto/createManyContacts.dto';

@Controller('contacts')
export class ContactsController {
    constructor(
        private readonly contactsService: ContactsService
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createManyContacts(@Body() input: CreateManyContactsDTO) {

        await this.contactsService.createManyContacts(input)

    }

    @Delete()
    @HttpCode(HttpStatus.OK)
    async deleteAllContacts() {
        await this.contactsService.deleteAllContacts()
    }
}
