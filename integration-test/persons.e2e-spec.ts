import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { App } from 'supertest/types';
import * as request from 'supertest';

import { DataSource } from 'typeorm';

import { AppModule } from '../src/app.module';
import { Person } from '../src/persons/person.entity';

describe('PersonsController (e2e)', () => {
  let app: INestApplication<App>;
  let dataSource: DataSource;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dataSource = moduleFixture.get<DataSource>(DataSource);
  });

  it('should return all persons', async () => {
    const personRepository = dataSource.getRepository(Person);
    const testPersons: Person[] = [
      {
        id: 1,
        firstName: 'Kylian',
        lastName: 'Mbappe',
        birthDate: new Date('12/20/1998'),
      },
      {
        id: 2,
        firstName: 'Ousmane',
        lastName: 'Dembele',
        birthDate: new Date('01/01/1997'),
      },
    ];
    await personRepository.save(testPersons);

    return request(app.getHttpServer())
      .get('/persons/')
      .expect(200)
      .expect((res) => {
        const expected = testPersons.map((person) => ({
          ...person,
          birthDate: person.birthDate.toISOString(),
        }));
        expect(res.body).toEqual(expected);
      });
  });
});
