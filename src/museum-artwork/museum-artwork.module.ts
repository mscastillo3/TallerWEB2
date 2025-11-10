import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MuseumService } from 'src/museum/museum.service';
import { MuseumEntity } from 'src/museum/museum.entity';
import { MuseumArtworkController } from './museum-artwork.controller';
import { MuseumArtworkService } from './museum-artwork.service';
import { ArtworkEntity } from 'src/artwork/artwork.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MuseumEntity]),
    TypeOrmModule.forFeature([ArtworkEntity]),
  ],
  providers: [MuseumArtworkService, MuseumService],
  controllers: [MuseumArtworkController],
})
export class MuseumArtworkModule {}
