import { Test, TestingModule } from '@nestjs/testing';
import { PersonsController } from './persons.controller';
import { Person } from './person.entity';
import { PersonsService } from './persons.service';

describe('PersonsController', () => {
  let controller: PersonsController;
  let personsService: {
    findAll: jest.Mock;
  };

  beforeEach(async () => {
    personsService = {
      findAll: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonsController],
      providers: [
        {
          provide: PersonsService,
          useValue: personsService,
        },
      ],
    }).compile();

    controller = module.get<PersonsController>(PersonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // TODO: Decide if controller tests are necessary since we'll have e2e tests
  it('should get all persons', async () => {
    const persons: Person = {
      id: 1,
      firstName: 'Kylian',
      lastName: 'Mbappe',
      birthDate: new Date('12/20/1998'),
    };
    personsService.findAll.mockResolvedValue(persons);

    const result = await controller.findAll();

    expect(result).toEqual(persons);
    expect(personsService.findAll).toHaveBeenCalled();
  });
});
