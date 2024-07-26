import { HttpException, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';
import { CacheInterface } from 'src/interfaces/cache.interface';
import { ConfigInterfaceDTO } from 'src/interfaces/config.interface';



@Injectable()
export class RedisService implements OnModuleDestroy, CacheInterface {
  private readonly redisClient: Redis;

  constructor() {
    
    this.redisClient = new Redis({
      
      host: process.env.REDIS_HOST, 
      port: +process.env.REDIS_PORT,
    });

    this.redisClient.on('error', e => {
      throw new Error(`Falha na conexão com o Redis: ${e}`);
    });
  }


  async onModuleDestroy(): Promise<void> {
    await this.redisClient.disconnect();
  }

  async get(prefix: string, key: string): Promise<string | null> {
    return this.redisClient.get(`${prefix}:${key}`);
  }

  async setConfig(config: ConfigInterfaceDTO): Promise<void> {
    await this.redisClient.set('config', JSON.stringify(config))
  }

  async getConfig(): Promise<ConfigInterfaceDTO> {
    const value = await this.redisClient.get('config')
    if(!value) throw new HttpException('Erro para encontrar a config!', 404)
    return JSON.parse(value)
  }

}
