import { Injectable } from '@nestjs/common';
//import { DevConfigServices } from './common/providers/DevConfigServices';

@Injectable()
export class AppService {
  // constructor(
  //   private devConfigService: DevConfigServices,
  //   @Inject('CONFIG') private config: { port: string },
  // ) {}
  getHello(): string {
    return 'hello world!';
    // return `Hello World! DBHOST from DevConfigService ${this.devConfigService.getDbHost()} in port ${this.config.port}`;
  }
}
