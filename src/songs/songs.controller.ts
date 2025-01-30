/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';

@Controller('songs')
export class SongsController {
    constructor(private songsService: SongsService){}
    @Get()
    findAll(){
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.songsService.findAll();
    }

    @Get(':id')
    fetchSong(){
        return 'fetch songs based on id';
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
