export function toUserDTO(user) {
    return {
        id: user.id,
        name: user.name,
        admin: user.admin,
        id_code: user.id_code,
    };
}

export function toUserListDTO(users) {
    return users.map(toUserDTO);
}