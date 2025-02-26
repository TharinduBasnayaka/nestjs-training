import { Artist } from 'src/artists/artist.entity';
import { Playlist } from '../playlists/playlist.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'time' })
  duration: Date;

  @Column({ type: 'date' })
  releasedDate: Date;

  @Column({ type: 'text' })
  lyrics: string;

  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'songs_artists' })
  artists: Artist[];

  @ManyToOne(() => Playlist, (playList) => playList.songs)
  playList: Playlist;
}
