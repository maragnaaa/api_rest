import { z } from "zod"

export const createProductSchema = z.object({
    code: z.number().int().positive().min(1),
    name: z.string().min(1),
    price: z.number().positive().min(1)
});

export const updateProductSchema = createProductSchema.partial();

export const productCodeParamSchema = z.object({
    code: z.coerce.number().int().positive().min(1)
});

export const productNameParamSchema = z.object({
    name: z.string().min(1),
});
