export function mongoenv() {
    let mongo: string

    if(process.env.MONGO)
        return mongo = process.env.MONGO
    else
        throw new Error("La variable de entorno 'MONGO' no es válida.")
}

export function jwtenv() {
    let jwt: string

    if(process.env.JWT)
        return jwt = process.env.JWT
    else
        throw new Error("La vraible de entorno 'JWT' no ")
}