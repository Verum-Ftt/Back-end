import { Event, EventProps } from '../entities/event.entity';

export interface EventRepository {
    findById(id: string): Promise <Event | null>
    findByTitle(title: string): Promise <Event | null>
    findByDate(date: Date): Promise <Event[] | null>
    findByDescription(description: string): Promise <Event[] | null>
    findAll(): Promise <Event[]>
    
    create(data: EventProps): Promise <Event>
    update(id: string, data: Partial<EventProps>): Promise <Event | null>
    delete(id: string): Promise <boolean>
}

// Token para injeção de dependência
export const EVENT_REPOSITORY = 'EventRepository'