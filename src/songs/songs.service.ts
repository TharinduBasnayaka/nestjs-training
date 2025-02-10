import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
  Scope,
} from '@nestjs/common';

@Injectable({
  scope: Scope.DEFAULT,
  // scope: Scope.TRANSIENT, //inejection scope example
})
export class SongsService implements OnModuleInit, OnApplicationShutdown {
  onApplicationShutdown(signal?: string) {
    console.log(`OnApplicationShutdown hook executed ${signal}`);
  }
  onModuleInit() {
    console.log(
      'the songs module is intialized - printed from SongsService service',
    );
  }
  //creating local array for learning, till we connect a DB

  private readonly songs: any[] = [];

  create(song: any) {
    this.songs.push(song);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.songs;
  }

  findAll() {
    //handling errors
    // throw new Error('error coming from the db');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.songs;
  }
}
