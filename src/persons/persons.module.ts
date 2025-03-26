import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Person } from './person.entity';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  exports: [TypeOrmModule],
  controllers: [PersonsController],
  providers: [PersonsService],
})
export class PersonsModule {}
