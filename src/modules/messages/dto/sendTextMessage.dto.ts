import { IsNotEmpty, IsString, Max, Min } from "class-validator";

export class SendTextMessageDTO {
    @IsNotEmpty()
    @IsString()
    @Max(400)
    @Min(2)
    textMessage: string

    @IsNotEmpty()
    @IsString()
    contactNumber: string
}