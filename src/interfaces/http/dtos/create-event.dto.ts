import { z } from 'zod'

export const createEventBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().datetime(),
})

export type CreateEventBodySchema = z.infer<typeof createEventBodySchema>