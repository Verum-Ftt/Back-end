import { PrismaService } from "../prisma.service";
import { Event as PrismaEventModel } from '@prisma/client';
import { Event, EventProps } from '@/core/entities/event.entity'
import { EventRepository } from "@/core/repositories/event.repository";

export class PrismaEventRepository implements EventRepository{
    constructor(private prisma: PrismaService) {}

    private toDomain(prismaEvent: PrismaEventModel | null): Event | null {
        if (!prismaEvent) {
        return null; 
        }

        return new Event(
            {
                created_by: prismaEvent.created_by,
                title: prismaEvent.title,
                event_date: prismaEvent.event_date,
                description: prismaEvent.description,
                date_created: prismaEvent.date_created,
                is_active: prismaEvent.is_active
            },
            prismaEvent.id,
        );
    }

    async create(data: EventProps): Promise<Event> {
        const createEventData =  await this.prisma.event.create({
            data: {
                created_by: data.created_by,
                title: data.title,
                event_date: data.event_date,
                description: data.description,
                date_created: data.date_created,
                is_active: data.is_active
            }
        })
        
        const domainEntity = this.toDomain(createEventData)
        if(!domainEntity){
            throw new Error('Falha ao mapear entidade criada para o domínio.');
        }

        return domainEntity
    }

    async findById(id: string): Promise<Event | null> {
        const eventIdData = await this.prisma.event.findUnique({ where: {id} })
        return this.toDomain(eventIdData)
    }

    async findByDate(date: Date): Promise<Event[] | null> {
        const eventData =  await this.prisma.event.findMany({ where: { date_created: date } })

        const domainEvents = eventData.map(eventData => this.toDomain(eventData))

        // O método .filter(Boolean) é um atalho para remover `null` ou `undefined` de um array.
        return domainEvents.filter(Boolean) as Event[]
    }

    async findByDescription(description: string): Promise<Event[] | null> {
        const eventDesriptionData = await this.prisma.event.findFirst({ where: { description } })

        const domainEvents = eventDesriptionData.map(eventDesriptionData => this.toDomain(eventDesriptionData))

        return domainEvents.filter(Boolean) as Event[]
    }

    async findByTitle(title: string): Promise<Event | null> {
        const eventTitleData = await this.prisma.event.findFirst({ where: { title } })
        return this.toDomain(eventTitleData)
    }

    async findAll(): Promise<Event[]> {
        const eventAllData = await this.prisma.event.findMany()

        const domainEvents = eventAllData.map(eventAllData => this.toDomain(eventAllData))

        return domainEvents.filter(Boolean) as Event[]
    }

    async update(id: string, data: Partial<EventProps>): Promise<Event | null> {
        try {
        const updatedEventData = await this.prisma.event.update({
            where: { id },
            data: {
                created_by: data.created_by,
                title: data.title,
                event_date: data.event_date,
                description: data.description,
                date_created: data.date_created,
                is_active: data.is_active
            },
        });
            return this.toDomain(updatedEventData);
        } catch (error) {
            return null;
        }
    }

    async delete(id: string): Promise<boolean> {
        try{
            await this.prisma.event.delete({ where: {id} })
            return true
        }catch (error) {
            console.error("Erro ao deletar Academic no Prisma:", error);
            return false;
        }
    }
}