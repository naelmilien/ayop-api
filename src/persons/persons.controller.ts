import { Controller, Get } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { Person } from './person.entity';

@Controller('persons')
export class PersonsController {
  constructor(private personService: PersonsService) {}

  @Get()
  findAll(): Promise<Person[]> {
    return this.personService.findAll();
  }
}
