import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  _usuario: Usuario;
  _usuarios: Array<Usuario>;

  constructor(private _usuarioService: UsuarioService) { 
    this._usuario = new Usuario();
    this._usuarios = new Array<Usuario>();
    this.obtenerUsuarios();
  }

  ngOnInit(): void {
  }

  public obtenerUsuarios() {
    this._usuarioService.getUsuarios().subscribe(
      (result) => {
        this._usuarios = new Array<Usuario>();
        result.forEach(element => {
          var _usu: Usuario = new Usuario();
          Object.assign(_usu, element);
          this._usuarios.push(_usu);
        })
      }
    )
  }

  public agregarUsuario() {
    this._usuarioService.addUsuario(this._usuario).subscribe(
      (result) => {
        this.obtenerUsuarios();
        alert('Usuario Agregado');
      },
      (error) => {
        console.log(error);
      }
    )
    this.limpiarCampos();
  }

  public limpiarCampos() {
    this._usuario = new Usuario();
  }

  public seleccionarUsuario(usuario: Usuario) {
    var tusuario = new Usuario();
    Object.assign(tusuario,usuario);
    this._usuario = tusuario;
  }

  public eliminarUsuario(usuario: Usuario){
    this._usuarioService.deleteUsuario(usuario).subscribe(
      (result)=>{
        alert("Usuario eliminado");
      }, 
      (error)=>{
        console.log(error);
      }
    );
    this.obtenerUsuarios();
  }

  public modificarUsuario(){
   this._usuarioService.updateUsuario(this._usuario).subscribe(
      (result)=>{
        alert("Usuario actualizado");
      },
      (error)=>{
        console.log(error);
      }
    );
    this.limpiarCampos();
    this.obtenerUsuarios();
  }

}
