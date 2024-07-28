import { IsNotEmpty, IsString } from "class-validator";

export class CreateSessionDTO {
    @IsNotEmpty()
    @IsString()
    actionSession: 'start' | 'stop'
}