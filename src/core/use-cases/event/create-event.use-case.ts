import { EventProps, Event } from "@/core/entities/event.entity";
import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { EVENT_REPOSITORY, EventRepository } from "@/core/repositories/event.repository";

@Injectable()
export class CreateEventUseCase{
    constructor(
        @Inject(EVENT_REPOSITORY)
        private eventRepository: EventRepository
    ) {}

    async execute(
        data: Omit<EventProps, 'id' | 'is_active' | 'date_created' | 'created_by'>, 
        user_id: string
    ): Promise<Event> {

        const titleExist = await this.eventRepository.findByTitle(data.title)
        if(titleExist){
            throw new ConflictException('Event with the same title already exist')
        }

        const eventToCreated: EventProps = {
            ...data,
            created_by: user_id
        } 

        const newEvent = await this.eventRepository.create(eventToCreated)
 
        return newEvent
    }
}