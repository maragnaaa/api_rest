export function toUserDTO(user) {
    return {
        name: user.name,
        admin: user.admin,
        id_code: user.id_code,
    };
}
