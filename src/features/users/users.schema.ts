import { z } from 'zod';

export const createUserSchema = z.object({
  name: z
    .string()
    .nonempty()
    .regex(/^[a-z]+$/),
  admin: z.boolean().default(false).nonoptional(),
  id_code: z.coerce.number().positive().nonoptional(),
});

export const updateUserSchema = createUserSchema.partial();

export const idUserParamSchema = z.object({
  id_code: z.coerce.number().positive().nonoptional(),
});

export const nameUserParamSchema = z.object({
  name: z
    .string()
    .nonempty()
    .regex(/^[a-z]+$/),
});

export type createUserSchema = z.infer<typeof createUserSchema>;
export type updateUserSchema = z.infer<typeof updateUserSchema>;
export type idUserParamSchema = z.infer<typeof idUserParamSchema>;
export type nameUserParamSchema = z.infer<typeof nameUserParamSchema>;
