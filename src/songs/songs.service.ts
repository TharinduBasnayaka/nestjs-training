import { HttpCode, HttpStatus, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDTO } from './dto/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'console';

@Injectable()
export class SongsService implements OnModuleInit {
  onModuleInit() {
    console.log(
      'the songs module is intialized - printed from SongsService service',
    );
  }
  constructor(
    @InjectRepository(Song) private songsRepository: Repository<Song>,
  ) {}
  //creating local array for learning, till we connect a DB
  private readonly songs: any[] = [];

  async createSong(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.releasedDate = songDTO.releaseDate;
    song.lyrics = songDTO.lyrics;

    return await this.songsRepository.save(song);
  }

  async fetchAllSongs(): Promise<Song[]> {
    //handling errors
    // throw new Error('error coming from the db');
    return await this.songsRepository.find();
  }

  async fetchSong(id: number): Promise<Song | null> {
    const song = await this.songsRepository.findOneBy({ id });

    if (!song) {
      throw new NotFoundException(
        `Cannot perform the Fetch Operation, Cause:No record found for the passed song Id: ${id}`,
      );
    }

    return song;
  }

  async deleteSong(id: number): Promise<object> {
    const deletedResult = await this.songsRepository.delete(id);
    if (deletedResult.affected === 0) {
      throw new NotFoundException(
        `Cannot perform the Delete Operation, Cause: No record found for the passed song Id: ${id}`,
      );
    } else {
      const successObj = {
        success: true,
        message: 'successfully deleted the record',
        httpStatusCode: HttpStatus.OK,
      };
      return successObj;
    }
  }

  // async updateSong(id : number): Promise<Song | null>{

  // }
}
