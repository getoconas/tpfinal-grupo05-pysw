import { Afiliado } from './afiliado';

export class Servicio {
    _id: string;
    nombre: string;
    imagen: string;
    activo: boolean;
    afiliadosInsc: Array<Afiliado> = new Array<Afiliado>();

    Servicio(_id?: string, nombre?: string, imagen?: string, activo?: boolean){
        this._id = _id;
        this.nombre = nombre;
        this.imagen = imagen;
        this.activo = activo;
    }
}
