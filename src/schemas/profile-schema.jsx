import { z } from "zod";

export const profileSchema = z.object({
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    meta_keywords: z.string().optional(),
});
