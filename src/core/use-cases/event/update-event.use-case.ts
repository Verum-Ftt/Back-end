import { ConflictException, Inject, NotFoundException } from "@nestjs/common";
import { EventProps, Event } from "@/core/entities/event.entity";
import { EVENT_REPOSITORY, EventRepository } from "@/core/repositories/event.repository";

export class UpdateEventUseCase {
    constructor(
        @Inject(EVENT_REPOSITORY)
        private eventRepository: EventRepository
    ) {}

    async execute(id: string, data: Partial<Pick<EventProps, 'title' | 'event_date' | 'description' | 'is_active'>>): Promise<Event> {
        const eventToUpdate = await this.eventRepository.findById(id)

        if(!eventToUpdate){
            throw new NotFoundException ('Event id not found')
        }
        
        if(typeof data.title === "string"){
            const titleExists = await this.eventRepository.findByTitle(data.title)
            if(titleExists && titleExists.id !== id){
                throw new ConflictException('Event with the same title already exists.');
            }
        }

        const updatedEvent = await this.eventRepository.update(id, data)

        if (!updatedEvent) {
            throw new NotFoundException(`Failed to update event with ID '${id}'. The record may no longer exist or the update resulted in no changes.`);
        }

        return updatedEvent 
    }
}