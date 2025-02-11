/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Song } from './song.entity';
import { DeleteResult } from 'typeorm';

@Controller('Songs')
export class SongsController {
    
    constructor(private songsService : SongsService){}

    @Post()
    create(@Body() createSongDTO: CreateSongDTO): Promise<Song>{
        try {
            return this.songsService.createSong(createSongDTO);
        } catch (error) {
            throw new HttpException('server error ',HttpStatus.INTERNAL_SERVER_ERROR, {cause: error});
        }
       
    }

    @Get()
    findAll(): Promise<Song[]>{
        try{
            return this.songsService.fetchAllSongs();
        }catch( error ){
            throw new HttpException('server error ',HttpStatus.INTERNAL_SERVER_ERROR, {cause: error});
        }
       
        
    }

    @Get(':id')
    fetchSong(@Param('id',new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))id: number ): Promise<Song | null> {
        
        try {
            return this.songsService.fetchSong(id);
        } catch (error) {
            throw new HttpException('server error ',HttpStatus.INTERNAL_SERVER_ERROR, {cause: error});
        }
    }
    
    // @Put(':id')
    // update(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))id: number): Promise<Song | null> {
    //   try {
    //     return this.songsService.updateSong(id);
    //   } catch (error) {
    //     throw new HttpException('server error ',HttpStatus.INTERNAL_SERVER_ERROR, {cause: error});
    //   }
    // }

   

    @Delete(':id')
    delete(@Param('id',new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))id: number ): Promise< object >{
       try {
            return this.songsService.deleteSong(id);
       } catch (error) {
            throw new HttpException('server error ',HttpStatus.INTERNAL_SERVER_ERROR, {cause: error});
       }
    }
    
}
