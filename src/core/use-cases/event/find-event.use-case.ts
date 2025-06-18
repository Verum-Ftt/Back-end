import { Event } from '@/core/entities/event.entity'
import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { EVENT_REPOSITORY, EventRepository } from "@/core/repositories/event.repository";

@Injectable()
export class FindEventUseCase {
    constructor(
        @Inject(EVENT_REPOSITORY)
        private eventRepository: EventRepository
    ) {}

    async findById(id: string): Promise<Event> {
        const eventIdExists = await this.eventRepository.findById(id)

        if(!eventIdExists){
            throw new NotFoundException ('Event id not found.')
        }

        return eventIdExists
    }

    async findByTitle(title: string): Promise<Event>{
        const eventTitleExists = await this.eventRepository.findByTitle(title)

        if(!eventTitleExists){
            throw new NotFoundException ('Event title not found.')
        }       

        return eventTitleExists
    }

    async findByDate(dateString: string): Promise<Event[]>{
        // Converte a string recebida para um objeto Date
        const date = new Date(dateString); 
    
        // Valide se a data é válida após a conversão, se necessário
        if (isNaN(date.getTime())) {
            throw new BadRequestException('Date format invalid.'); 
        }

        const eventDateExists = await this.eventRepository.findByDate(date)

        return eventDateExists || []
    }

    async findByDescription(description: string): Promise<Event[]>{
        const eventDescriptionExists = await this.eventRepository.findByDescription(description)

        return eventDescriptionExists || []
    }

    async findAll(): Promise<Event[]>{
        const allEventsExistis = await this.eventRepository.findAll()

        return allEventsExistis || []
    }
}