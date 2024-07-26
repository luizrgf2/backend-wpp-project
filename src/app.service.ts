import { Injectable } from '@nestjs/common';
import { ConfigInterfaceDTO } from './interfaces/config.interface';

@Injectable()
export class AppService {

  

  async setConfig(config: ConfigInterfaceDTO) : Promise<void> {



  }

}
