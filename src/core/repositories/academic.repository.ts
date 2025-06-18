import { Academic, AcademicProps } from '../entities/academic.entity';

export interface AcademicRepository {
    findById(id: string | undefined): Promise <Academic | null>
    findByEmail(email: string): Promise <Academic | null>
    findByRA(RA: string): Promise <Academic | null>
    findByPhone(phone: string): Promise <Academic | null>
    findAll(): Promise <Academic[]>
    
    create(data: AcademicProps): Promise<Academic>; 
    update(id: string, data: Partial<AcademicProps>): Promise<Academic | null>
    delete(id: string): Promise<boolean>
}

// Token para injeção de dependência
export const ACADEMIC_REPOSITORY = 'AcademicRepository'