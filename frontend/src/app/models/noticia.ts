import { Usuario } from './usuario';

export class Noticia {
    _id: string;
    titulo: string;
    descripcion: string;
    fecha: Date;
    usuario: Usuario;
    vigente: boolean;

    constructor() {
    
    }

}
