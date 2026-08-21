import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(1),
    admin: z.boolean().default(false),
    id_code: z.number().int().positive().min(1)
});

export const updateUserSchema = createUserSchema.partial();

export const userIdParamSchema = z.object({
    id_code: z.coerce.number().int().positive().min(1)
});

export const userNameParamSchema = z.object({
    name: z.string().min(1),
});
