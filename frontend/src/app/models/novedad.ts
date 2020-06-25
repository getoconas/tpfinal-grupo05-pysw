import { Usuario } from './usuario';

export class Novedad {
    _id: string;
    usuario: Usuario;
    texto: string;
    estado: string;

    Novedad(_id?: string, usuario?: Usuario, texto?: string, estado?: string){
        this._id = _id;
        this.usuario = new Usuario();
        this.texto = texto;
        this.estado = estado;
    }
}
