import { Usuario } from './usuario';

export class Noticia {
    _id: string;
    titulo: string;
    descripcion: string;
    fecha: Date;
    usuario: Usuario;
    vigente: boolean;

    Noticia(_id?: string, titulo?: string, descripcion?: string, fecha?: Date, usuario?: Usuario, vigente?: boolean){
        this._id = _id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.usuario = new Usuario();
        this.vigente = vigente;
        
    }

}
