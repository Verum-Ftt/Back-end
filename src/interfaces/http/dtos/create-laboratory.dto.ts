import { z } from "zod";

export const createLaboratory = z.object({
    local: z.string(), 
    quantity: z.number().default(10)
})

export type CreateLaboratoryBodySchema = z.infer<typeof createLaboratory>