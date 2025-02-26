import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Playlist } from './playlist.entity';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { CreatePlayListDto } from './dto/create-playlist-dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,

    @InjectRepository(Song)
    private songRepository: Repository<Song>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(playListDTO: CreatePlayListDto): Promise<Playlist> {
    const playList = new Playlist();
    playList.name = playListDTO.name as string;

    const songs = await this.songRepository.find({
      where: { id: In(playListDTO.songs) },
    });
    playList.songs = songs;

    const user = await this.userRepository.findOneBy({ id: playListDTO.user });
    if (user) {
      playList.user = user;
    } else {
      throw new Error('User not found');
    }
    return this.playlistRepository.save(playList);
  }
}
