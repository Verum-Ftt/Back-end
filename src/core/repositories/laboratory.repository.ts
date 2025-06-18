import { Laboratory, LaboratoryProps } from '../entities/laboratory.entity';

export interface LaboratoryRepository {
    findById(id: string): Promise <Laboratory | null>
    findByLocal(local: string | undefined): Promise <Laboratory | null>
    findAll(): Promise <Laboratory[]>
    
    create(data: LaboratoryProps): Promise <Laboratory>
    update(id: string, data: Partial<LaboratoryProps>): Promise <Laboratory>
    delete(id: string): Promise <Laboratory>
}

// Token para injeção de dependência
export const LABORATORY_REPOSITORY = 'LaboratoryRepository'