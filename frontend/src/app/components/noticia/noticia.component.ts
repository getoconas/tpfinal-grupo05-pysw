import { Component, OnInit } from '@angular/core';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from 'src/app/services/noticia.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/models/usuario';
import { FacebookService, InitParams, LoginResponse } from 'ngx-fb'; 
import { ApiMethod } from 'ngx-fb/dist/esm/providers/facebook';     

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
  mensaje:string;
  hoy : string;
  _auxNoticia:Noticia=new Noticia();

  constructor(private _noticiaService: NoticiaService, private _toastr: ToastrService, private router:Router, private loginService: LoginService, private fb: FacebookService) { 
    //validacion por ruta
    if (!loginService.userLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    this._noticia = new Noticia();
    this._noticia.vigente=true;
    this._noticias = new Array<Noticia>();
    this._convertido="";
    this.hoy = this.getFechaMin();
    console.log(this.hoy);
    this.iniciarFb();
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
      this.msgError('Titulo repetido.');
    } else {
      this._noticia.imagen = this._convertido;
      this._noticia.usuario = new Usuario();
      this._noticia.usuario._id = this.loginService.userLogged._id; //captura id del usuario logeado
      this._noticiaService.addNoticia(this._noticia).subscribe(
        (result) => {
          this.obtenerNoticias();
          this.msgSuccess('Agregado correctamente.');
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
    this._noticia.vigente = true;
    this.editMode = false;
    this._convertido = "";
  }

  public seleccionarNoticia(noticia: Noticia) {
    this.editMode = true;
    var tnoticia = new Noticia();
    Object.assign(tnoticia,noticia);
    this._noticia = tnoticia;
    this._noticia.fecha = this._noticia.fecha.substring(0,10)+"T"+new Date(this._noticia.fecha).toLocaleTimeString();
  }

  public eliminarNoticia(noticia: Noticia){
    this._noticiaService.deleteNoticia(noticia).subscribe(
      (result)=>{
        this.obtenerNoticias();
        this.msgInfo('Eliminado correctamente.');
      }, 
      (error)=>{
        console.log(error);
      }
    );
  }

  public modificarNoticia(){
    if (this._convertido != "") {
      this._noticia.imagen = this._convertido;
    }
    this._noticia.usuario = new Usuario();
    this._noticia.usuario._id = this.loginService.userLogged._id;
    this._noticiaService.updateNoticia(this._noticia).subscribe(
      (result)=>{
        this.obtenerNoticias();
        this.msgInfo('Modificado correctamente.');
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

  auxiliarNoticia(_noticia:Noticia){
    this._auxNoticia=_noticia;
  }

  //metodo de facebook/
  postFb(_noticia:Noticia){
    this.mensaje = _noticia.titulo + ":  " + _noticia.descripcion + "  Escrito por:  " + _noticia.usuario.usuario;
    var apiMethod: ApiMethod = "post";
    this.fb.api('/110749894034738/feed', apiMethod,  //id pagina de face
    {
      "message": this.mensaje,
      "access_token":"EAAC5pDAv8wABACpYqnMnrdUpxTnd3RITwpLjg7DcjLJXjNev1MVCxThuyw7YROFlL5h9dH0EJ4ldmtF2RFZChO607BZB262DZAMI0hlEHCC3RZCMwpUj6qxpOMzQTn7diiXMSTaHtZAU36tG5ePFIx4DsJqyplRZCpiYZBaAsfIltZCb3LPy2wetzvdI2gH3ZCb0ZD"
    });
    this.msgSuccess('Publicado correctamente en Facebook.');
  }

  iniciarFb(){
    let initParams: InitParams = {
      appId: '204114834223872',   //id de la app Obrasocial
      autoLogAppEvents : true,
      xfbml : true,
      version : 'v7.0'
    };
    this.fb.init(initParams);
  }

  mostrarfecha(){
    console.log(this._noticia.fecha);
  }

  //armo la fecha de hoy en el formato que espera el atributo min del imput fecha(yyyy-MM-ddT00:00)
  getFechaMin(){
    const hoy = new Date();
    const day = hoy.getDate().toString().padStart(2, '0');
    const month = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const year = hoy.getFullYear().toString();

    return year + "-"+ month + "-" + day + "T00:00";
  }

  /* --- Inicio - Toastr - Mensajes que se muestran en pantalla ---*/
  private msgSuccess(_msg) {
    this._toastr.success('Noticia: ' + _msg, 'Éxito');
  }
  
  private msgError(_msg) {
    this._toastr.error('Noticia: ' + _msg, 'Error');
  }

  private msgInfo(_msg) {
    this._toastr.info('Noticia: ' + _msg, 'Info');
  }  
  /* --- Fin - Toastr - Mensajes que se muestran en pantalla ---*/
}