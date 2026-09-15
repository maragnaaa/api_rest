import type { users } from '../../generated/prisma/client.ts';

export function userDTO(users: users) {
  return {
    name: users.name,
    admin: users.admin,
    id_code: users.id_code,
  };
}
