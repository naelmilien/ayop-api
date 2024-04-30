import { Test, TestingModule } from '@nestjs/testing'
import { EmployeesController } from './employees.controller'
import { EmployeesService } from './employees.service'

describe('EmployeesController', () => {
  let controller: EmployeesController
  let service: EmployeesService

  const mockEmployeesService = {
    findAll: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        {
          provide: EmployeesService,
          useValue: mockEmployeesService,
        },
      ],
    }).compile()

    controller = module.get<EmployeesController>(EmployeesController)
    service = module.get<EmployeesService>(EmployeesService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should return an array of employees', async () => {
    const expectedEmployees = [{ id: 1, name: 'John Doe' }]
    mockEmployeesService.findAll.mockResolvedValue(expectedEmployees)
    expect(await controller.findAll()).toEqual(expectedEmployees)
  })
})
