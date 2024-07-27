import { HttpException, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';
import { CacheInterface } from 'src/interfaces/cache.interface';
import { ConfigInterfaceDTO } from 'src/interfaces/config.interface';
import { ProgressContactsInterface } from 'src/interfaces/progressContacts.interface';

enum ContactState {
  QUEUE = 'queue',
  FINALIZED = 'finalized'
}

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

  async addContactToProgressContacts(contact: string): Promise<void> {
    const contactKey = `progress:${contact}`;
    await this.redisClient.hmset(contactKey, 'contact', contact, 'state', ContactState.QUEUE);
  }

  async clearCacheProgressContacts(): Promise<void> {
    const keys = await this.redisClient.keys('progress:*');
    if (keys.length > 0) {
      await this.redisClient.del(...keys);
    }
  }

  async getProgressContacts(): Promise<ProgressContactsInterface> {
    const keys = await this.redisClient.keys('progress:*');
    if (keys.length === 0) throw new HttpException('Não existe um progresso de campanha de mensagens no momento!', 404);

    const contacts = await Promise.all(keys.map(async key => {
      const contact = await this.redisClient.hgetall(key);
      return {
        contact: contact.contact,
        state: contact.state as ContactState
      };
    }));

    return { contacts };
  }

  async getContactState(contact: string): Promise<ContactState | undefined> {
    const contactKey = `progress:${contact}`;
    const state = await this.redisClient.hget(contactKey, 'state');
    return state as ContactState;
  }

  async changeContactState(contact: string, state: ContactState): Promise<void> {
    const contactKey = `progress:${contact}`;
    const exists = await this.redisClient.exists(contactKey);
    if (!exists) throw new HttpException('Esse contato não foi adicionado ao progresso', 400);
    await this.redisClient.hset(contactKey, 'state', state);
  }

}
