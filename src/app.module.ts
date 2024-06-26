import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EmployeesModule } from './employees/employees.module'
import { Employee } from './employees/employee.entity'
// import { Employee } from './employees/employee.entity'
// import { EmployeesController } from './employees/employees.controller'
// import { EmployeesService } from './employees/employees.service'
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'localdb',
      entities: [Employee],
      synchronize: true,
    }),
    EmployeesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
