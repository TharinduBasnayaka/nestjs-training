import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    //testing logs added to the class
    console.log('request ....', new Date().toDateString());
    next();
  }
}
