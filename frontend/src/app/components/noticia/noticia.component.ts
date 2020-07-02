import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from 'src/app/services/noticia.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {
  _noticia: Noticia;
  _noticias: Array<Noticia>;
  editMode:boolean=false;
  _convertido: string;

  constructor(private _noticiaService: NoticiaService, private toastr:ToastrService, private router:Router, private loginService: LoginService) { 
    //validacion por ruta
    if (!loginService.userLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    this._noticia = new Noticia();
    this._noticia.vigente=true;
    this._noticias = new Array<Noticia>();
    this.obtenerNoticias();
  }

  ngOnInit(): void {
  }
  public obtenerNoticias() {
    this._noticiaService.getNoticias().subscribe(
      (result) => {
        this._noticias = new Array<Noticia>();
        result.forEach(element => {
          var _noti: Noticia = new Noticia();
          Object.assign(_noti, element);
          this._noticias.push(_noti);
        })
      }
    )
  }

  public agregarNoticia() {
    var _existeNoticia: boolean = false;
    for (var i in this._noticias) {
      if (this._noticias[i].titulo == this._noticia.titulo) {
        _existeNoticia = true;
      }
    }
    if (_existeNoticia) {
      this.toastr.error("Titulo repetido");
    } else{
          this._noticia.imagen = this._convertido;
          this._noticia.usuario = new Usuario();
          this._noticia.usuario._id = this.loginService.userLogged._id; //captura id del usuario logeado
          this._noticiaService.addNoticia(this._noticia).subscribe(
            (result) => {
              this.obtenerNoticias();
              this.toastr.success('Noticia Agregada Exitosamente');
            },
            (error) => {
              console.log(error);
            }
          )
          this.limpiarCampos();
    }
  }

  public limpiarCampos() {
    this._noticia = new Noticia();
    this._noticia.vigente=true;
    this.editMode=false;
    this._convertido= "";
  }

  public seleccionarNoticia(noticia: Noticia) {
    this.editMode=true;
    var tnoticia = new Noticia();
    Object.assign(tnoticia,noticia);
    this._noticia = tnoticia;
  }

  public eliminarNoticia(noticia: Noticia){
    this._noticiaService.deleteNoticia(noticia).subscribe(
      (result)=>{
        this.obtenerNoticias();
        this.toastr.info('Noticia Eliminada Exitosamente');
      }, 
      (error)=>{
        console.log(error);
      }
    );
  }

  public modificarNoticia(){
    if (this._convertido != "") {
      this._noticia.imagen = this._convertido;}
   this._noticiaService.updateNoticia(this._noticia).subscribe(
      (result)=>{
        this.obtenerNoticias();
        this.toastr.success('Noticia Modificada Exitosamente');
      },
      (error)=>{
        console.log(error);
      }
    );
    this.limpiarCampos();
  }
  /* Convierte una imagen a string */
  public convertirArchivo(file) {
    if (file != null) {
      console.log("Archivo cambiado..", file);
      this._convertido = file[0].base64;
    } else {
      console.log("error");
    }
  }
}
