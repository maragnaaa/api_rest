import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(1),
    admin: z.boolean().default(false),
    id_code: z.number().int().positive().min(1).max(3)
});

export const updateUserSchema = createUserSchema.partial();

export const userIdParamSchema = z.object({
    id_code: z.coerce.number().int().positive().min(1).max(3),
});

export const userNameParamSchema = z.object({
    name: z.string().min(1),
});

export const listUsersQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
});