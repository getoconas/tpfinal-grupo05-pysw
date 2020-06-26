export class Afiliado {
    _id : string;
    apellido : string;
    nombres : string;
    dni : number;
    email : string;
    imagen : string;
    telefono : number;

    Afiliado(_id?:string,apellido?:string,nombres?:string,dni?:number,email?:string,imagen?:string,telefono?:number){
        this._id = _id;
        this.apellido = apellido;
        this.nombres = nombres;
        this.dni = dni;
        this.email = email;
        this.imagen = imagen;
        this.telefono = telefono;
    }
}
