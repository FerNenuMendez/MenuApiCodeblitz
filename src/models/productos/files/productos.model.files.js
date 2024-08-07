import { randomUUID } from 'node:crypto';

export class Producto {
    constructor({ nombre, foto, precio, stock, descripcion, estado, tiendaID, inventario }) {

        this._nombre = nombre
        this._foto = foto
        this._precio = precio
        this._stock = stock
        this._descripcion = descripcion
        this._estado = estado
        this._tiendaID = tiendaID
        this._inventario = inventario
    }


    get nombre() { return this._nombre; }
    get foto() { return this._foto; }
    get precio() { return this._precio; }
    get stock() { return this._stock; }
    get descripcion() { return this.descripcion; }
    get estado() { return this._estado; }
    get tiendaID() { return this._tiendaID; }
    get inventario() { return this._inventario; }


    set nombre(value) {
        if (!value) throw new Error('el nombre es obligatorio')
        this._nombre = value
    }
    set foto(value) {
        if (!value) throw new Error('el foto es obligatorio')
        this._foto = value
    }
    set precio(value) {
        if (!value) throw new Error('el precio es obligatorio')
        this._precio = value
    }
    set stock(value) {
        if (!value) throw new Error('el stock es obligatorio')
        this._stock = value
    }
    set descripcion(value) {
        if (!value) throw new Error('el descripcion es obligatorio')
        this._descripcion = value
    }
    set estado(value) {
        if (!value) throw new Error('el estado es obligatorio')
        this._estado = value
    }
    set tiendaID(value) {
        if (!value) throw new Error('el tiendaID es obligatorio')
        this._tiendaID = value
    }
    set inventario(value) {
        if (!value) throw new Error('el inventario es obligatorio')
        this._inventario = value
    }

    toPOJO() {
        return {
            nombre: this._nombre,
            foto: this._foto,
            precio: this._precio,
            stock: this._stock,
            descripcion: this._descripcion,
            estado: this._estado,
            tiendaID: this._tiendaID,
            inventario: this._inventario
        };
    }
}