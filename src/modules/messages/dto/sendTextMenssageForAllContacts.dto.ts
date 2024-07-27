import { IsNotEmpty, IsString } from "class-validator";

export class SendTextMenssageForAllContactsDTO {
    @IsString()
    @IsNotEmpty()
    textMessage: string
}