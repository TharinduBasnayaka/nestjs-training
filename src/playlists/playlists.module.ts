import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { Playlist } from './playlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song, User, Playlist])],
  controllers: [],
  providers: [],
})
export class PlaylistsModule {}
