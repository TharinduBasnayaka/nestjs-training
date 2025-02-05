import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigServices } from './common/providers/DevConfigServices';

const devConfig = {
  port: 3000,
};
const proConfig = {
  port: 4000,
};
@Module({
  imports: [SongsModule],
  controllers: [AppController],
  providers: [
    AppService,
    //this is a example of a class based providers
    {
      provide: DevConfigServices,
      useClass: DevConfigServices,
    },
    //example ends
    //example for factory provider
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
      },
    },
    //example ends
  ],
})
export class AppModule implements NestModule {
  //using the logger middleware in the AppModule
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(LoggerMiddleware).forRoutes('songs'); //applying middleware - method no 1, only run for the specific route
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST }); //applying middleware - method 2, only for specific endpoint in the route

    consumer.apply(LoggerMiddleware).forRoutes(SongsController); // applying middlerware -method 3, using the Controller of the module
  }
}
