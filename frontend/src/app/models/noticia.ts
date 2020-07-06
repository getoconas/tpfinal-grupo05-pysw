import { Usuario } from './usuario';

export class Noticia {
    _id: string;
    titulo: string;
    descripcion: string;
    fecha: string;
    usuario: Usuario;
    vigente: boolean;
    imagen: string;

    Noticia(_id?: string, titulo?: string, descripcion?: string, fecha?: string, usuario?: Usuario, vigente?: boolean, imagen?: string){
        this._id = _id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.usuario = new Usuario();
        this.vigente = vigente;
        this.imagen = imagen;
        
    }

}
