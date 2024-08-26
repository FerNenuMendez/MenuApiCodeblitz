import { hashSync, compareSync, genSaltSync } from "bcrypt";

export function matches(query) {
    return function (elem) {
        for (const key in query) {
            if (!elem.hasOwnProperty(key) || elem[key] !== query[key]) {
                return false
            }
        }
        return true
    }
}

export function toPOJO(obj) {
    return JSON.parse(JSON.stringify(obj))
}

export async function capitalize(param) {
    return param.toUpperCase();
}

export function hashear(frase) {
    if (!frase) throw new Error('cannot has invalid parameter:' + frase)
    return hashSync(frase, genSaltSync(10))
}

export function hasheadaSonIguales(recibida, almacenada) {
    if (!recibida) throw new Error('cannot hash invalid parameter:' + recibida)
    return compareSync(recibida, almacenada)
}

export function buscarPorMail(array, mail) {
    if (!Array.isArray(array)) {
        throw new Error("El parámetro 'array' no es un array válido");
    }
    for (let i = 0; i < array.length; i++) {
        if (array[i].mail === mail) {
            return array[i];
        }
    }
    return null; // Retorna null si no se encuentra el objeto
}

export function buscarPorToken(array, token) {
    if (!Array.isArray(array)) {
        throw new Error("El parámetro 'array' no es un array válido");
    }
    for (let i = 0; i < array.length; i++) {
        if (array[i].resetPasswordToken === token) {
            return array[i];
        }
    }
    return null; // Retorna null si no se encuentra el objeto
}