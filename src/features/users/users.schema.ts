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

export type createUserInput = z.infer<typeof createUserSchema>;
export type updateUserInput = z.infer<typeof updateUserSchema>;
export type idUserParamInput = z.infer<typeof idUserParamSchema>;
export type nameUserParamInput = z.infer<typeof nameUserParamSchema>;
