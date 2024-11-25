import { z } from "zod";

export const storeShema = z.object({
    acc_id: z.number().optional(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email({ message: "Email must be valid" }),
    number: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .regex(/^\d+$/, "Phone number must contain only numbers"),
    store_name: z.string().min(1, "Store name is required"),
    plan_id: z.string(),
    state: z.string({ message: "State is required" }).nonempty("State is Required."),
    city: z.string({ message: "City is required" }).nonempty("City is Required."),
    area: z.string({ message: "Area is required" }).nonempty("Area is Required."),
    meta_title: z.string({ message: "Meta title is required" }),
    meta_description: z.string({ message: "Meta description is required" }),
    meta_keywords: z.string({ message: "Keywords are required." }),
    password: z.string().min(7, "Password must have atleast 7 characters.").optional()
});

export const buyPlanSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email({ message: "Email must be valid" }),
    number: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .regex(/^\d+$/, "Phone number must contain only numbers"),
    store_name: z.string().min(1, "Store name is required"),
    plan_id: z.string().nonempty("Plan is required."),
    state: z.string({ message: "State is required" }).nonempty("State is Required."),
    city: z.string({ message: "City is required" }).nonempty("City is Required."),
    area: z.string({ message: "Area is required" }).nonempty("Area is Required."),
    password: z.string().min(7, "Password must have atleast 7 characters.").optional(),
    agree_to_terms: z.boolean().refine((value) => value === true),
})