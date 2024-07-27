import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { PrismaService } from 'src/infra/prisma.service';

@Module({
  providers: [ContactsService, PrismaService],
  controllers: [ContactsController]
})
export class ContactsModule {}
