import { randomUUID } from 'node:crypto'

export class User {

    constructor({ userID = randomUUID(), mail, password, aux, estado, ingreso, lastLogin, avatar, nickname, nivel, tiendaID, inventario }) {
        this._userID = userID
        this._mail = mail
        this._password = password
        this._aux = aux
        this._estado = estado
        this._ingreso = ingreso
        this._lastLogin = lastLogin
        this._avatar = avatar
        this._nickname = nickname
        this._nivel = nivel
        this._tiendas = tiendaID
        this._inventario = inventario
    }
    get userID() { return this._userID }
    get mail() { return this._mail }
    //get password() { return this._password }
    get aux() { return this._aux }
    get estado() { return this._estado }
    get ingreso() { return this._ingreso }
    get lastLogin() { return this._lastLogin }
    get avatar() { return this._avatar }
    get nickname() { return this._nickname }
    get nivel() { return this._nivel }
    get tiendaID() { return this._tiendaID }
    get inventario() { return this._inventario }

    set mail(value) {
        if (!value) throw new Error('el mail es obligatorio')
        this._mail = value
    }

    set password(value) {
        if (!value) throw new Error('el password es obligatorio')
        this._password = value
    }

    set aux(value) {
        this._aux = value
    }

    set estado(value) {
        this._estado = value
    }

    set ingreso(value) {
        this._ingreso = value
    }


    set lastLogin(value) {
        this._lastLogin = value
    }

    set avatar(value) {
        this._avatar = value
    }
    set nickname(value) {
        if (!value) throw new Error('el nickname es obligatorio')
        this._nickname = value
    }

    set nivel(value) {
        this._nivel = value
    }

    set tiendaID(value) {
        this._tiendaID = value
    }

    set inventario(value) {
        this._inventario = value
    }

    toPOJO() {
        return {
            userID: this._userID,
            mail: this._mail,
            password: this._password,
            aux: this._aux,
            estado: this._estado,
            ingreso: this._ingreso,
            lastLogin: this._lastLogin,
            avatar: this._avatar,
            nickname: this._nickname,
            nivel: this._nivel,
            tiendaID: this._tiendaID,
            inventario: this._inventario
        }
    }
}