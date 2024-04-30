import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Employee } from './employee.entity'

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find()
  }
}
