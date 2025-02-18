/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Song } from './song.entity';
import { UpdateSongDTO } from './dto/update-song-dto';

@Controller('songs')
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
    fetchSongById(@Param('id',new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))id: number ): Promise<Song[]> {
        
        try {
            return this.songsService.fetchSongById(id);
        } catch (error) {
            throw new HttpException('server error ',HttpStatus.INTERNAL_SERVER_ERROR, {cause: error});
        }
    }

    @Get('title/:title')
    fetchSongByName(@Param('title') title: string){
        try {
            if(!title){
                throw new Error('Title is required');
            }
            return this.songsService.fetchSongByName(title.toLowerCase());
        } catch (error) {
            throw new HttpException('server error ',HttpStatus.INTERNAL_SERVER_ERROR, {cause: error});
        }
    }
    
    @Put(':id')
    update(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))id: number, @Body() updateSongDTO : UpdateSongDTO): Promise<object> {
      try {
        return this.songsService.updateSong(id,updateSongDTO);
      } catch (error) {
        throw new HttpException('server error ',HttpStatus.INTERNAL_SERVER_ERROR, {cause: error});
      }
    }

    @Delete(':id')
    delete(@Param('id',new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}))id: number ): Promise< object >{
       try {
            return this.songsService.deleteSong(id);
       } catch (error) {
            throw new HttpException('server error ',HttpStatus.INTERNAL_SERVER_ERROR, {cause: error});
       }
    }
    
}
