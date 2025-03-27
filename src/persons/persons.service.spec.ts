import { Test, TestingModule } from '@nestjs/testing';
import { PersonsService } from './persons.service';
import { Person } from './person.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PersonsService', () => {
  let mockService: PersonsService;
  let mockRepository: { find: jest.Mock };

  beforeEach(async () => {
    mockRepository = {
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonsService,
        {
          provide: getRepositoryToken(Person),
          useValue: mockRepository,
        },
      ],
    }).compile();

    mockService = module.get<PersonsService>(PersonsService);
  });

  it('should be defined', () => {
    expect(mockService).toBeDefined();
  });

  it('should find all persons', async () => {
    const persons: Person = {
      id: 1,
      firstName: 'Kylian',
      lastName: 'Mbappe',
      birthDate: new Date('12/20/1998'),
    };
    mockRepository.find.mockResolvedValue(persons);

    const result: Person[] = await mockService.findAll();

    expect(mockRepository.find).toHaveBeenCalled();
    expect(result).toEqual(persons);
  });
});
