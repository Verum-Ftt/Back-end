import { z } from 'zod';
import { Event } from '../../../../../core/entities/event.entity';

// Esquema Zod para a resposta (útil para consistência e documentação)
export const EventResponseSchema = z.object({
  id: z.string().uuid(),
  created_by: z.string().uuid(),
  title: z.string(),
  event_date: z.date(),
  description: z.string(),
  date_created: z.date(),
  is_active: z.boolean(),
});

export type EventResponseDto = z.infer<typeof EventResponseSchema>;

// Função para mapear a entidade de domínio para o DTO de resposta
export function toEventResponseDto(event: Event): EventResponseDto {
  return {
    id: event.id!,
    created_by: event.created_by!,
    title: event.title,
    event_date: event.eventDate,
    description: event.description,
    date_created: event.dateCreated,
    is_active: event.isActive,
  };
}

export function toEventListResponseDto(events: Event[]): EventResponseDto[] {
  if (!events || events.length === 0) {
    return [];
  }
  
  return events.map(toEventResponseDto).filter(Boolean) as EventResponseDto[];
}