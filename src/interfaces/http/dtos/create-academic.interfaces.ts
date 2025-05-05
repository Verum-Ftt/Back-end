import { z } from "zod"

export const createAcademicBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    RA: z.string(),
    password: z.string()
}) 

export type CreateAcademicBodySchema = z.infer<typeof createAcademicBodySchema>