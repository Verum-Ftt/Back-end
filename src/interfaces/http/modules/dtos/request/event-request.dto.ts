import { z } from 'zod';

export const CreateEventSchema = z.object({
    created_by: z.string(),
    title: z.string().min(5, 'Description deve conter no mínimo 5 caracteres'),
    event_date: z.date(),
    description: z.string().min(10, 'Description deve conter no mínimo 10 caracteres')
})

export type CreateEventRequestDto = z.infer<typeof CreateEventSchema>

export const UpdateEventSchema = z.object({
    created_by: z.string(),
    title: z.string().min(5, 'Description deve conter no mínimo 5 caracteres'),
    event_date: z.date(),
    description: z.string().min(10, 'Description deve conter no mínimo 10 caracteres')
})

export type UpdateEventRequestDto = z.infer<typeof UpdateEventSchema>
