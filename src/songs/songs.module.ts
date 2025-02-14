import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Artist } from 'src/artists/artist.entity';
//import { connection } from '../common/constants/connection';

// const mockSongsService = {
//   findAll() {
//     return [{ id: 1, title: 'Animals' }];
//   },
// };

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist])],
  controllers: [SongsController],
  //providers: [SongsService], //standard provider
  // providers: [
  //   {
  //     provide: SongsService,
  //     useClass: SongsService, //class based provider
  //   },
  // ],
  // providers: [
  //   {
  //     provide: SongsService,
  //     //this is a use of value provider, used for testing purposes,
  //     // since we can mock the data in the module without calling the real implementation,
  //     // to check whether the controllers and services are working fine or not
  //     useValue: mockSongsService,
  //   },
  // ],

  providers: [
    SongsService,
    //This is a example for non class based providers
    // { provide: 'CONNECTION', useValue: connection },
  ],
})
export class SongsModule {}
