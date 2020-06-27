export class Usuario {
    
    _id: string;
    usuario: string;
    password: string;
    activo: boolean;
    perfil: string;

    Usuario(_id?: string, usuario?: string, password?: string, activo?: boolean, perfil?: string){
        this._id = _id;
        this.usuario = usuario;
        this.password = password;
        this.activo= activo;
        this.perfil= perfil;
    }
}
