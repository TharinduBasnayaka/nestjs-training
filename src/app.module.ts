import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
//import { DevConfigServices } from './common/providers/DevConfigServices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/song.entity';
import { Artist } from './artists/artist.entity';
import { User } from './users/user.entity';
import { PlaylistsController } from './playlists/playlists.controller';
import { PlaylistsService } from './playlists/playlists.service';
import { PlaylistsModule } from './playlists/playlists.module';

// const devConfig = {
//   port: 3000,
// };
// const proConfig = {
//   port: 4000,
// };
@Module({
  imports: [
    SongsModule,
    //Establishing a connection with DB using TypeOrm
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'spotify_clone',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      entities: [Song, Artist, User],
      synchronize: true,
    }),
    PlaylistsModule,
  ],
  controllers: [AppController, PlaylistsController],
  providers: [
    AppService,
    PlaylistsService,
    //this is a example of a class based providers
    // {
    //   provide: DevConfigServices,
    //   useClass: DevConfigServices,
    // },
    //example ends
    //example for factory provider
    // {
    //   provide: 'CONFIG',
    //   useFactory: () => {
    //     return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
    //   },
    // },
    //example ends
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log('dbname: ', dataSource.driver.database);
  }
  //using the logger middleware in the AppModule
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(LoggerMiddleware).forRoutes('songs'); //applying middleware - method no 1, only run for the specific route
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST }); //applying middleware - method 2, only for specific endpoint in the route

    consumer.apply(LoggerMiddleware).forRoutes(SongsController); // applying middlerware -method 3, using the Controller of the module
  }
}
