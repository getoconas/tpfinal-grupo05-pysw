import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  _usuario: Usuario;
  _usuarios: Array<Usuario>;
  editMode:boolean=false;

  constructor(private _usuarioService: UsuarioService, private toastr:ToastrService, private router:Router, private loginService: LoginService) { 
    //validacio por ruta
    if (!loginService.userLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    this._usuario = new Usuario();
    this._usuario.activo=true;
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
    var _existeUsuario: boolean = false;
    for (var i in this._usuarios) {
      if (this._usuarios[i].usuario == this._usuario.usuario) {
        _existeUsuario = true;
      }
    }
    if (_existeUsuario) {
      this.toastr.error("Usuario repetido");
    } else{
          this._usuarioService.addUsuario(this._usuario).subscribe(
            (result) => {
              this.obtenerUsuarios();
              this.toastr.success('Usuario Agregado Exitosamente');
            },
            (error) => {
              console.log(error);
            }
          )
          this.limpiarCampos();
    }
  }

  public limpiarCampos() {
    this._usuario = new Usuario();
    this._usuario.activo=true;
    this.editMode=false;
  }

  public seleccionarUsuario(usuario: Usuario) {
    this.editMode=true;
    var tusuario = new Usuario();
    Object.assign(tusuario,usuario);
    this._usuario = tusuario;
  }

  public eliminarUsuario(usuario: Usuario){
    this._usuarioService.deleteUsuario(usuario).subscribe(
      (result)=>{
        this.obtenerUsuarios();
        this.toastr.info('Usuario Eliminado Exitosamente');
      }, 
      (error)=>{
        console.log(error);
      }
    );
  }

  public modificarUsuario(){
   this._usuarioService.updateUsuario(this._usuario).subscribe(
      (result)=>{
        this.obtenerUsuarios();
        this.toastr.success('Usuario Modificado Exitosamente');
      },
      (error)=>{
        console.log(error);
      }
    );
    this.limpiarCampos();
  }

}