import { Student, StudentsProps } from '../entities/students.entity';

export interface StudentRepository {
    findById(id: string): Promise <Student | null>
    findByName(name: string): Promise <Student | null>
    findByEmail(email: string): Promise <Student | null>
    findByPhone(phone: string): Promise <Student | null>
    findByRA(RA: string): Promise <Student | null>
    findByPeriod(period: string): Promise <Student[] | null>
    findByCourse(course: string): Promise <Student[] | null>
    findByGrade(grade: string): Promise <Student[] | null>
    findAll(): Promise <Student[]>
    
    create(data: StudentsProps): Promise <Student>
    createMany(data: StudentsProps[]): Promise <Student[]>
    update(id: string, data: Partial<StudentsProps>): Promise <Student>
    delete(id: string): Promise <boolean>
}

// Token para injeção de dependência
export const STUDENTS_REPOSITORY = 'StudentRepository'