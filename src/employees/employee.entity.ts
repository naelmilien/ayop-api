import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'first_name' })
  firstName: string

  @Column({ name: 'last_name' })
  lastName: string

  @Column()
  email: string

  @Column({ name: 'date_of_birth' })
  dateOfBirth: Date

  @Column()
  salary: number
}
