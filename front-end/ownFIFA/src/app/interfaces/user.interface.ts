export interface User {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: Role
}

export enum Role {
    ADMINISTRADOR = "Administrador",
    INVITADO = "Invitado"
}