import { z } from 'zod'

export const createEventBodySchema = z.object({
    description: z.string(),
    date: z.coerce.date()
})

export type CreateEventBodySchema = z.infer<typeof createEventBodySchema>