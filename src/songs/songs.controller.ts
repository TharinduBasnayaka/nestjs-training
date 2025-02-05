/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Connection } from 'src/common/constants/connection';

@Controller('songs')
export class SongsController {
    constructor(private songsService: SongsService, @Inject('CONNECTION') private connection: Connection){
        console.log('connection string from the connection constant file ', this.connection.CONNECTION_STRING)
    }

    @Get()
    findAll(){
        //Exception handling in controller to provide the http status code and error message to front end
        try{
             // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return this.songsService.findAll();
        }catch( error ){
            throw new HttpException('server error ',HttpStatus.INTERNAL_SERVER_ERROR, {cause: error});
            console.log('found error while fetching the songs ',error)
        }
       
        
    }

    @Get(':id')
    fetchSong(@Param('id',new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))id: number ){
        return 'fetch songs based on id: '+(typeof id);
    }
    
    @Put(':id')
    update(){
        return 'update songs based on id';
    }

    @Post()
    create(@Body() createSongDTO: CreateSongDTO){
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.songsService.create(createSongDTO);
    }

    @Delete(':id')
    delete(){
        return 'delete song based on id';
    }
    


}
