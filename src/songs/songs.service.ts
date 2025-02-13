import {
  HttpStatus,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDTO } from './dto/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSongDTO } from './dto/update-song-dto';

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

  //controller function for create song
  async createSong(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title.toLowerCase();
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.releasedDate = songDTO.releaseDate;
    song.lyrics = songDTO.lyrics;

    return await this.songsRepository.save(song);
  }
  //controller function for fetch all songs
  async fetchAllSongs(): Promise<Song[]> {
    //handling errors
    // throw new Error('error coming from the db');
    return await this.songsRepository.find();
  }
  //controller function for fetch song
  async fetchSongById(id: number): Promise<Song | null> {
    const song = await this.songsRepository.findOneBy({ id });

    if (!song) {
      throw new NotFoundException(
        `Cannot perform the Fetch Operation, Cause:No record found for the passed song Id: ${id}`,
      );
    }

    return song;
  }

  async fetchSongByName(title: string): Promise<Song | null> {
    const song = await this.songsRepository.findOne({ where: { title } });
    console.log(song);
    if (!song) {
      throw new NotFoundException(
        `Cannot perform the Fetch Operation, Cause:No record found for the passed song title : ${title}`,
      );
    }
    return song;
  }
  //controller function for delete song
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
  //controller function for update song
  async updateSong(id: number, updateSongDTO: UpdateSongDTO): Promise<object> {
    const updateResult = await this.songsRepository.update(id, updateSongDTO);
    if (updateResult.affected === 0) {
      throw new NotFoundException(
        `Cannot perform the Update Operation, Cause: No record found for the passed song Id: ${id}`,
      );
    } else {
      const successObj = {
        success: true,
        message: 'successfully updated the record',
        httpStatusCode: HttpStatus.OK,
      };
      return successObj;
    }
  }
}
