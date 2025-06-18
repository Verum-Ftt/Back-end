import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { EVENT_REPOSITORY, EventRepository } from "@/core/repositories/event.repository";

@Injectable()
export class DeleteEventUseCase {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private eventRepository: EventRepository,
  ) {}
  
  async execute(id: string): Promise<void> {
    const eventExists = await this.eventRepository.findById(id)

    if(!eventExists){
        throw new NotFoundException ('Event id not found')
    }

    const wasDeleted = await this.eventRepository.delete(id)

    if(!wasDeleted){
        throw new NotFoundException ('Failed to delete event')
    }
    
  }
}