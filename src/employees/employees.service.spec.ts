import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { EmployeesService } from './employees.service'
import { Employee } from './employee.entity'

describe('EmployeesService', () => {
  let service: EmployeesService

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        {
          provide: getRepositoryToken(Employee),
          useValue: mockRepository,
        },
      ],
    }).compile()

    service = module.get<EmployeesService>(EmployeesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return an array of employees', async () => {
    const expectedEmployees = [{ id: 1, name: 'John Doe' }]
    mockRepository.find.mockResolvedValue(expectedEmployees)
    expect(await service.findAll()).toEqual(expectedEmployees)
  })
})
