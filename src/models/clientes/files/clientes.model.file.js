
import { randomUUID } from 'node:crypto';

export class Cliente {
    constructor({ id = randomUUID(), nombre, apellido, dni, telefono, mail, password, domicilio, nacimiento, eCivil, userID, inventario }) {
        this.id = id;
        this._nombre = nombre;
        this._apellido = apellido;
        this._dni = dni;
        this._telefono = telefono;
        this._mail = mail;
        this._password = password;
        this._domicilio = domicilio;
        this._nacimiento = nacimiento;
        this._eCivil = eCivil;
        this._userID = userID;
        this._inventario = inventario;
    }

    get id() { return this.id; }
    get nombre() { return this._nombre; }
    get apellido() { return this._apellido; }
    get dni() { return this._dni; }
    get telefono() { return this._telefono; }
    get mail() { return this._mail; }
    get password() { return this._password }
    get domicilio() { return this._domicilio; }
    get nacimiento() { return this._nacimiento; }
    get eCivil() { return this._eCivil; }
    get userID() { return this._userID; }
    get inventario() { return this._inventario; }

    set nombre(value) {
        if (!value) throw new Error('El nombre es obligatorio');
        this._nombre = value;
    }

    set apellido(value) {
        if (!value) throw new Error('El apellido es obligatorio');
        this._apellido = value;
    }

    set dni(value) {
        if (!value) throw new Error('El DNI es obligatorio');
        if (typeof value !== 'number') throw new Error('El DNI debe ser un número');
        this._dni = value;
    }

    set telefono(value) {
        if (!value) throw new Error('El teléfono es obligatorio');
        if (typeof value !== 'number') throw new Error('El teléfono debe ser un número');
        this._telefono = value;
    }

    set mail(value) {
        if (!value) throw new Error('El mail es obligatorio');
        if (!/\S+@\S+\.\S+/.test(value)) throw new Error('El mail debe ser una dirección válida');
        this._mail = value;
    }

    set password(value) {
        if (!value) throw new Error('El password es obligatorio');
        this._password = value;
    }

    set domicilio(value) {
        if (!value) throw new Error('El domicilio es obligatorio');
        this._domicilio = value;
    }

    set nacimiento(value) {
        if (!value) throw new Error('La fecha de nacimiento es obligatoria');
        if (!(value instanceof Date)) throw new Error('La fecha de nacimiento debe ser una fecha válida');
        this._nacimiento = value;
    }

    set eCivil(value) {
        if (!value) throw new Error('El estado civil es obligatorio');
        this._eCivil = value;
    }

    set userID(value) {
        if (!value) throw new Error('El userID es obligatorio');
        this._userID = value;
    }

    set inventario(value) {
        if (!Array.isArray(value)) throw new Error('El inventario debe ser un array');
        this._inventario = value;
    }

    toPOJO() {
        return {
            id: this.id,
            nombre: this._nombre,
            apellido: this._apellido,
            dni: this._dni,
            telefono: this._telefono,
            mail: this._mail,
            password: this._password,
            domicilio: this._domicilio,
            nacimiento: this._nacimiento,
            eCivil: this._eCivil,
            userID: this._userID,
            inventario: this._inventario
        };
    }
}
