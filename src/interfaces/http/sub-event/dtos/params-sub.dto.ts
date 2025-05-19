import { z } from "zod";

export const createSubEventParamSchema = z.object({
    event_id: z.string(), 
    subjective_id: z.string(),
})

export type CreateSubEventParamSchema = z.infer<typeof createSubEventParamSchema>