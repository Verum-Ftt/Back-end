import { z } from "zod";

export const createSubEventBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().datetime()
})

export type CreateSubEventBodySchema = z.infer<typeof createSubEventBodySchema>