import { Test, TestingModule } from '@nestjs/testing';
import { MuseumService } from './museum.service';

import { faker } from '@faker-js/faker';
import { MuseumEntity } from './museum.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

jest.setTimeout(20000);

describe('MuseumService', () => {
  let service: MuseumService;
  let repository: Repository<MuseumEntity>;
  let museumsList: MuseumEntity[] = [];
  const seedDatabase = async () => {
    try {
      await repository.clear();
      museumsList = [];

      for (let i = 0; i < 5; i++) {
        const museum = await repository.save({
          name: faker.company.name(),
          description: faker.lorem.sentence(),
          address: faker.location.secondaryAddress(),
          city: faker.location.city(),
          image: faker.image.url(),
          foundedBefore: faker.string.numeric(),
        });
        museumsList.push(museum);
      }
      const museum = await repository.save({
        name: 'oro',
        description: faker.lorem.sentence(),
        address: faker.location.secondaryAddress(),
        city: 'Bogotá',
        image: faker.image.url(),
        foundedBefore: '1200',
      });
      museumsList.push(museum);
      const museum2 = await repository.save({
        name: 'oro',
        description: faker.lorem.sentence(),
        address: faker.location.secondaryAddress(),
        city: 'Bogotá',
        image: faker.image.url(),
        foundedBefore: '1200',
      });
      museumsList.push(museum2);
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [MuseumService],
    }).compile();

    service = module.get<MuseumService>(MuseumService);
    repository = module.get<Repository<MuseumEntity>>(
      getRepositoryToken(MuseumEntity),
    );

    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all museums', async () => {
    const museums: MuseumEntity[] = await service.findAll({});
    expect(museums).not.toBeNull();
    expect(museums).toHaveLength(museumsList.length);
  });

  it('findOne should return a museum by id', async () => {
    const storedMuseum: MuseumEntity = museumsList[0];
    const museum: MuseumEntity = await service.findOne(storedMuseum.id);
    expect(museum).not.toBeNull();
    expect(museum.name).toEqual(storedMuseum.name);
    expect(museum.description).toEqual(storedMuseum.description);
    expect(museum.address).toEqual(storedMuseum.address);
    expect(museum.city).toEqual(storedMuseum.city);
    expect(museum.image).toEqual(storedMuseum.image);
  });

  it('findOne should throw an exception for an invalid museum', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The museum with the given id was not found',
    );
  });

  it('create should return a new museum', async () => {
    try {
      const museum: MuseumEntity = {
        id: '',
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        address: faker.location.secondaryAddress(),
        city: faker.location.city(),
        image: faker.image.url(),
        foundedBefore: faker.string.numeric(),
        exhibitions: [],
        artworks: [],
      };
      const newMuseum: MuseumEntity = await service.create(museum);
      expect(newMuseum).not.toBeNull();

      const storedMuseum: MuseumEntity = (await repository.findOne({
        where: { id: newMuseum.id },
      })) as MuseumEntity;
      expect(storedMuseum).not.toBeNull();
      expect(storedMuseum.name).toEqual(newMuseum.name);
      expect(storedMuseum.description).toEqual(newMuseum.description);
      expect(storedMuseum.address).toEqual(newMuseum.address);
      expect(storedMuseum.city).toEqual(newMuseum.city);
      expect(storedMuseum.image).toEqual(newMuseum.image);
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  });
  it('update should modify a museum', async () => {
    const museum: MuseumEntity = museumsList[0];
    museum.name = 'New name';
    museum.address = 'New address';
    const updatedMuseum: MuseumEntity = await service.update(museum.id, museum);
    expect(updatedMuseum).not.toBeNull();
    const storedMuseum: MuseumEntity = (await repository.findOne({
      where: { id: museum.id },
    })) as MuseumEntity;
    expect(storedMuseum).not.toBeNull();
    expect(storedMuseum.name).toEqual(museum.name);
    expect(storedMuseum.address).toEqual(museum.address);
  });
  it('update should throw an exception for an invalid museum', async () => {
    let museum: MuseumEntity = museumsList[0];
    museum = {
      ...museum,
      name: 'New name',
      address: 'New address',
    };
    await expect(() => service.update('0', museum)).rejects.toHaveProperty(
      'message',
      'The museum with the given id was not found',
    );
  });
  it('delete should remove a museum', async () => {
    const museum: MuseumEntity = museumsList[0];
    await service.delete(museum.id);
    const deletedMuseum: MuseumEntity | null = await repository.findOne({
      where: { id: museum.id },
    });
    expect(deletedMuseum).toBeNull();
  });
  it('delete should throw an exception for an invalid museum', async () => {
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'message',
      'The museum with the given id was not found',
    );
  });

  it('findAll should filter museums by city', async () => {
    const filtered = await service.findAll({ city: 'Bogota' });
    expect(filtered.every((m) => m.city.toLowerCase().includes('bogota'))).toBe(
      true,
    );
  });

  it('findAll should filter museums by name', async () => {
    const filtered = await service.findAll({ name: 'oro' });
    expect(filtered.every((m) => m.name.toLowerCase().includes('oro'))).toBe(
      true,
    );
  });

  it('findAll should filter museums founded before a year', async () => {
    const filtered = await service.findAll({ foundedBefore: '1900' });
    expect(filtered.every((m) => parseInt(m.foundedBefore, 10) < 1900)).toBe(
      true,
    );
  });
  it('findAll should filter museums founded before a year and by name', async () => {
    const filtered = await service.findAll({
      foundedBefore: '1900',
      name: 'oro',
    });

    expect(filtered).not.toBeNull();
    expect(
      filtered.every(
        (m) =>
          parseInt(m.foundedBefore, 10) < 1900 &&
          m.name.toLowerCase().includes('oro'),
      ),
    ).toBe(true);
  });
  it('findAll should apply pagination with page and limit', async () => {
    const page = 2;
    const limit = 5;
    const filtered = await service.findAll({ page, limit });

    expect(filtered).not.toBeNull();
    expect(filtered.length).toBeLessThanOrEqual(limit);
  });
  it('findAll should use default pagination when no parameters are provided', async () => {
    const filtered = await service.findAll({});

    expect(filtered).not.toBeNull();
    expect(filtered.length).toBeLessThanOrEqual(10); // default limit
  });
  it('findAll should filter by city, name, and foundedBefore with pagination', async () => {
    const filtered = await service.findAll({
      city: 'Bogota',
      name: 'oro',
      foundedBefore: '1900',
      page: 1,
      limit: 10,
    });

    expect(filtered).not.toBeNull();
    expect(filtered.length).toBeLessThanOrEqual(10);
    expect(
      filtered.every(
        (m) =>
          m.city.toLowerCase().includes('bogota') &&
          m.name.toLowerCase().includes('oro') &&
          new Date(m.foundedBefore).getFullYear() < 1900,
      ),
    ).toBe(true);
  });
});
