import { Injectable } from '@nestjs/common';

@Injectable()
export class DevConfigServices {
  private DBHOST: string = 'localhost';

  getDbHost() {
    return this.DBHOST;
  }
}
