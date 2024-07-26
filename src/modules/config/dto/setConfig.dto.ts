import { IsNotEmpty, IsNumber } from "class-validator";

export class SetConfigDTO {
    @IsNumber()
    @IsNotEmpty()
    startTime: number

    @IsNumber()
    @IsNotEmpty()
    endTime: number
}