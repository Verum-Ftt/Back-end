import { z } from "zod";

export const createSubjectivesBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    season: z.string()
})

export type CreateSubjectivesBodySchema = z.infer<typeof createSubjectivesBodySchema>