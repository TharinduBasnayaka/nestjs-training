import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  //creating local array for learning, till we connect a DB

  private readonly songs: any[] = [];

  create(song) {
    this.songs.push(song);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.songs;
  }

  findAll() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.songs;
  }
}
