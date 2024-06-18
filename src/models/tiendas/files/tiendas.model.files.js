import { randomUUID } from 'node:crypto'

export class Tiendas {

    constructor({ tiendaID = randomUUID(), nombre, logo, foto, descripcion, telefono, mail, domicilio, ingreso, estado, users, productos, inventario }) {
        this._tiendaID = tiendaID
        this._nombre = nombre
        this._logo = logo
        this._foto = foto
        this._descripcion = descripcion
        this._telefono = telefono
        this._mail = mail
        this._domicilio = domicilio
        this._ingreso = ingreso
        this._estado = estado
        this._inventario = inventario
    }
    get tiendaID() { return this._tiendaID }
    get nombre() { return this._nombre }
    get logo() { return this._logo }
    get foto() { return this._foto }
    get descripcion() { return this._descripcion }
    get telefono() { return this._telefono }
    get mail() { return this._mail }
    get domicilio() { return this._domicilio }
    get ingreso() { return this._ingreso }
    get estado() { return this._estado }
    get inventario() { return this._inventario }

    set nombre(value) {
        if (!value) throw new Error('el nombre es obligatorio')
        this._nombre = value
    }
    set logo(value) {
        if (!value) throw new Error('el logo es obligatorio')
        this._logo = value
    }
    set foto(value) {
        if (!value) throw new Error('el foto es obligatorio')
        this._foto = value
    }
    set descripcion(value) {
        if (!value) throw new Error('el descripcion es obligatorio')
        this._descripcion = value
    }
    set telefono(value) {
        if (!value) throw new Error('el telefono es obligatorio')
        this._telefono = value
    }
    set mail(value) {
        if (!value) throw new Error('el mail es obligatorio')
        this._mail = value
    }
    set domicilio(value) {
        if (!value) throw new Error('el domicilio es obligatorio')
        this._domicilio = value
    }
    set ingreso(value) {
        if (!value) throw new Error('el ingreso es obligatorio')
        this._ingreso = value
    }
    set estado(value) {
        if (!value) throw new Error('el estado es obligatorio')
        this._estado = value
    }
    set inventario(value) {
        if (!value) throw new Error('el inventario es obligatorio')
        this._inventario = value
    }


    toPOJO() {
        return {
            nombre: this._nombre,
            logo: this._logo,
            foto: this._foto,
            descripcion: this._descripcion,
            telefono: this._telefono,
            mail: this._mail,
            domicilio: this._domicilio,
            ingreso: this._ingreso,
            estado: this._estado,
            inventario: this._inventario
        }
    }
}