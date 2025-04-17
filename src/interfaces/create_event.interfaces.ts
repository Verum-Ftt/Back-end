import { z } from 'zod'

export const createEventBodySchema = z.object({
    description: z.string(),
    date: z.date()

})

export type CreateEventBodySchema = z.infer<typeof createEventBodySchema>