import { Controller, Get } from '@nestjs/common'
import { EmployeesService } from './employees.service'
import { Employee } from './employee.entity'

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  findAll(): Promise<Employee[]> {
    return this.employeesService.findAll()
  }
}
