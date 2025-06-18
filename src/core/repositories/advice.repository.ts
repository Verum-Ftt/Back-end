import { Advice, AdviceProps } from '../entities/advice.entity';

export interface AcademicRepository {
    findById(id: string | undefined): Promise <Advice | null>
    findByLaboratory(laboratory_id: string): Promise <Advice[] | null>
    findBySubEvent(sub_event_id: string): Promise <Advice[] | null>
    findByCreator(created_by: string): Promise <Advice[] | null>
    findByDescription(description: string): Promise<Advice[] | null>
    findAll(): Promise <Advice[]>
    
    create(data: AdviceProps): Promise<Advice>; 
    update(id: string, data: Partial<AdviceProps>): Promise<Advice | null>
    delete(id: string): Promise<boolean>
}

// Token para injeção de dependência
export const ADVICE_REPOSITORY = 'AdviceRepository'