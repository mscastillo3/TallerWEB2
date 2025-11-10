import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MuseumEntity } from './museum.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class MuseumService {
  constructor(
    @InjectRepository(MuseumEntity)
    private readonly museumRepository: Repository<MuseumEntity>,
  ) {}

  async findAll(filters: {
    city?: string;
    name?: string;
    foundedBefore?: string;
    page?: number;
    limit?: number;
  }): Promise<MuseumEntity[]> {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;
    const skip = (page - 1) * limit;

    const queryBuilder = this.museumRepository.createQueryBuilder('museum');

    if (filters.city) {
      queryBuilder.andWhere('LOWER(museum.city) LIKE LOWER(:city)', {
        city: `%${filters.city}%`,
      });
    }

    if (filters.name) {
      queryBuilder.andWhere('LOWER(museum.name) LIKE LOWER(:name)', {
        name: `%${filters.name}%`,
      });
    }

    if (filters.foundedBefore) {
      const year = parseInt(filters.foundedBefore, 10);
      if (!isNaN(year)) {
        queryBuilder.andWhere(
          "CAST(strftime('%Y', museum.foundedBefore) AS INTEGER) < :year",
          {
            year,
          },
        );
      }
    }

    return await queryBuilder.skip(skip).take(limit).getMany();
  }

  async findOne(id: string): Promise<MuseumEntity> {
    const museum: MuseumEntity | null = await this.museumRepository.findOne({
      where: { id },
      relations: ['artworks', 'exhibitions'],
    });
    if (!museum)
      throw new BusinessLogicException(
        'The museum with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    return museum;
  }
  async create(museum: MuseumEntity): Promise<MuseumEntity> {
    return await this.museumRepository.save(museum);
  }
  async update(id: string, museum: MuseumEntity): Promise<MuseumEntity> {
    const persistedMuseum: MuseumEntity | null =
      await this.museumRepository.findOne({ where: { id } });
    if (!persistedMuseum)
      throw new BusinessLogicException(
        'The museum with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    return await this.museumRepository.save({ ...persistedMuseum, ...museum });
  }
  async delete(id: string) {
    const museum: MuseumEntity | null = await this.museumRepository.findOne({
      where: { id },
    });
    if (!museum)
      throw new BusinessLogicException(
        'The museum with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    await this.museumRepository.remove(museum);
  }
}
