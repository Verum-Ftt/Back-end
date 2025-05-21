import { z } from "zod";

export const createAdviceBodySchema = z.object({
    description: z.string(),
    tier: z.enum(["low", "medium", "high"])
})

export type CreateAdviceBodySchema = z.infer<typeof createAdviceBodySchema>