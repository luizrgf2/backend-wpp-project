import { Body, Controller, Get, HttpCode, Put } from '@nestjs/common';
import { SetConfigDTO } from './dto/setConfig.dto';
import { ConfigService } from './config.service';
import { ConfigInterfaceDTO } from 'src/interfaces/config.interface';

@Controller('config')
export class ConfigController {

    constructor(
        private readonly configService: ConfigService,
    ) {}

    @Put('')
    async setConfig(@Body() setConfig: SetConfigDTO) {

        this.configService.setConfig({
            endTime: setConfig.endTime,
            startTime: setConfig.startTime
        })

    }

    @Get('')
    async getConfig(): Promise<ConfigInterfaceDTO> {
        return this.configService.getConfig()
    }
}
