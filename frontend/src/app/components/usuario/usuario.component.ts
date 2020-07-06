import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Afiliado } from 'src/app/models/afiliado';
import { AfiliadoService } from 'src/app/services/afiliado.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  _usuario: Usuario;
  _auxiliarUsuario: Usuario;
  _usuarios: Array<Usuario>;
  _usuarioLogueado: Usuario;
  _afiliados: Array<Afiliado>;
  editMode:boolean=false;

  constructor(private _usuarioService: UsuarioService, private toastr:ToastrService, private router:Router, private loginService: LoginService, private _afiliadoService: AfiliadoService) { 
    //validacio por ruta
    if (!loginService.userLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    this._usuario = new Usuario();
    this._auxiliarUsuario = new Usuario();
    this._usuario.activo=true;
    this._usuarios = new Array<Usuario>();
    this._usuarioLogueado = loginService.userLogged;
    this.obtenerAfiliados();
    this.obtenerUsuarios();
  }

  /* Obtiene una lista de usuarios */
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

  /* Agrega un usuario */
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
          this.toastr.success('Usuario Agregado Correctamente');
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

  /* Elimina un usuario */
  public eliminarUsuario(usuario: Usuario) {
    this._usuarioService.deleteUsuario(usuario).subscribe(
      (result) => {
        this.obtenerUsuarios();
        this.toastr.info('Usuario Eliminado Correctamente');
      }, 
      (error) => {
        console.log(error);
      }
    );
  }

  /* Modifica un usuario */
  public modificarUsuario(){
   this._usuarioService.updateUsuario(this._usuario).subscribe(
      (result)=>{
        this.obtenerUsuarios();
        this.toastr.success('Usuario Modificado Correctamente');
      },
      (error)=>{
        console.log(error);
      }
    );
    this.limpiarCampos();
  }
  
  /*Obtiene todos los afiliados */
  obtenerAfiliados(){
    var afiliado:Afiliado = new Afiliado();
    this._afiliados = new Array<Afiliado>();
    this._afiliadoService.getAfiliados().subscribe(
      (result)=>{(
        result.forEach(element => {
          Object.assign(afiliado, element);
          this._afiliados.push(afiliado);
          afiliado = new Afiliado();
        })
      )},
      (error)=>{
        console.log(error);
      }
    )
  }

  public auxiliarUsuario(usuario) {
    this._auxiliarUsuario = usuario;
  }

  ngOnInit(): void {
  }

}