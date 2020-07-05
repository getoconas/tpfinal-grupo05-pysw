import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Novedad } from 'src/app/models/novedad';
import { NovedadService } from 'src/app/services/novedad.service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-novedad',
  templateUrl: './novedad.component.html',
  styleUrls: ['./novedad.component.css']
})
export class NovedadComponent implements OnInit {

  _novedad: Novedad;
  _novedades: Array<Novedad>;
  primeringreso: boolean = true;

  constructor( private _novedadService: NovedadService, private toastr:ToastrService, private router:Router, public loginService: LoginService) {
    //validacion por ruta
    if (!loginService.userLoggedIn) {
      this.router.navigateByUrl('/login');
    }

    this._novedad = new Novedad();
    this._novedades = new Array<Novedad>();
    this.obtenerNovedades();
   }

  ngOnInit(): void {
  }

  obtenerNovedades(){
    this._novedadService.getNovedades().subscribe(
      (result) => {
        console.log(result);
        this._novedades = new Array<Novedad>();
        result.forEach(element => {
          var _nov: Novedad = new Novedad();
          console.log(element);
          Object.assign(_nov, element);
          this._novedades.push(_nov);
        })
      }
    )
  }

  public agregarNovedad() {
    this._novedad.estado = false;
    //if(this.primeringreso==true){
      this._novedad.usuario = new Usuario();
      this._novedad.usuario._id= this.loginService.userLogged._id; //captura el perfil del usuario logueado
      //this.primeringreso = false;
    //}
    //if(this.primeringreso==false){
      this._novedadService.addNovedad(this._novedad).subscribe(
        (result) => {
          this.obtenerNovedades();
          this.toastr.success('Novedad Agregada Exitosamente');
          this.limpiarCampos();
        },
        (error) => {
          console.log(error);
          }
        )    
    //}
     
  }

  public limpiarCampos() {
    this._novedad = new Novedad();   
  }

  public seleccionarNovedad(novedad: Novedad) {
    var tnovedad = new Novedad();
    Object.assign(tnovedad,novedad);
    this._novedad = tnovedad;
  }

  public eliminarNovedad(novedad: Novedad){
    this._novedadService.deleteNovedad(novedad).subscribe(
      (result)=>{
        this.obtenerNovedades();
        this.toastr.info('Novedad Eliminada Exitosamente');
      }, 
      (error)=>{
        console.log(error);
      }
    );
  }


  public modificarNovedad(novedad:Novedad){
   this._novedadService.updateNovedad(novedad).subscribe(
      (result)=>{
        this.obtenerNovedades();
        this.toastr.success('Estado Actualizado Exitosamente');
      },
      (error)=>{
        console.log(error);
      }
    );
    this.limpiarCampos();
  }

  mostrarEstado(estado:Boolean){
    if(estado==true){
      return "Procesado"
    }
    else{
      return "Pendiente"
    }
  }
  

}
