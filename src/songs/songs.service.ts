import { Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.REQUEST,
  // scope: Scope.TRANSIENT, //inejection scope example
})
export class SongsService {
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
