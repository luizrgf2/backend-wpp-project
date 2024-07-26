import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/infra/redis.service';
import { ConfigInterfaceDTO } from 'src/interfaces/config.interface';

@Injectable()
export class ConfigService {
    
    constructor(
        private readonly cacheService: RedisService
    ){}

    async setConfig(config: ConfigInterfaceDTO) : Promise<void> {
        await this.cacheService.setConfig(config)
    }

    async getConfig(): Promise<ConfigInterfaceDTO> {
        return await this.cacheService.getConfig()
    }
}
