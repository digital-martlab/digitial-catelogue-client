import { z } from "zod";

export const planShema = z.object({
    plan_type: z.string().nonempty("Plan type is required."),
    plan_price: z
        .string()
        .nonempty("Price is required.")
        .transform((value) => parseFloat(value))
        .refine((value) => !isNaN(value) && value >= 0, "Price must be a positive number."),
    plan_duration_months: z
        .string()
        .nonempty("Duration is required.")
        .transform((value) => parseInt(value, 10))
        .refine((value) => !isNaN(value) && value > 0, "Duration must be a positive integer."),
});
