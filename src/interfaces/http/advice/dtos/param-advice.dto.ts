import { z } from "zod";

export const createAdviceParamSchema = z.object({
    laboratory_id: z.string(), 
    sub_event_id: z.string(),
})

export type CreateAdviceParamSchema = z.infer<typeof createAdviceParamSchema>