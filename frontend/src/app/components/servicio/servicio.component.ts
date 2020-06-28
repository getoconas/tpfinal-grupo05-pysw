import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/models/servicio';
import { ServicioService } from 'src/app/services/servicio.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
  
  _servicio: Servicio;
  _servicioAuxiliar: Servicio;
  _servicios: Array<Servicio>;
  _convertido: string;

  constructor(private _servicioService: ServicioService,private toastr:ToastrService) { 
    this._servicio = new Servicio();
    this._servicio.activo=true;
    this._servicioAuxiliar = new Servicio();
    this._servicios = new Array<Servicio>();
    this.obtenerServicios();
  }

  public obtenerServicios() {
    this._servicioService.getServicios().subscribe(
      (result) => {
        this._servicios = new Array<Servicio>();
        result.forEach(element => {
          var _ser: Servicio = new Servicio();
          Object.assign(_ser, element);
          this._servicios.push(_ser);
        })
      }
    )
  }

  /* Agrega un servicio */
  public agregarServicio() {
    this._servicio.imagen = this._convertido;
    console.log(this._servicio);
    this._servicioService.addServicio(this._servicio).subscribe(
      (result) => {
        this.obtenerServicios();
        this._convertido = "";
        alert('Servicio Agregado');
      },
      (error) => {
        console.log(error);
      }
    )
    this.limpiarCampos();
  }

  public limpiarCampos() {
    this._servicio = new Servicio();
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

  /* Modifica un servicio */
  public modificarServicio() {
    this._servicioService.updateServicio(this._servicio).subscribe(
      (result)=>{
        this.obtenerServicios();
        alert("Servicios actualizado");
      },
      (error)=>{
        console.log(error);
      }
    );
    this.limpiarCampos();
  }

  /* Elimina un servicio */
  public eliminarServicio(servicio) {
    console.log(servicio);
    this._servicioService.deleteServicio(servicio._id).subscribe(
      (result) => {
        this.obtenerServicios();
        this.toastr.info('Servicio Eliminado Exitosamente');
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public auxiliarServicio(servicio) {
    this._servicioAuxiliar = servicio;
  }

  ngOnInit(): void {
  }

  public seleccionarServicio(servicio: Servicio) {
    var tservicio = new Servicio();
    Object.assign(tservicio,servicio);
    this._servicio = tservicio;
  }

  /*

  public eliminarServicio(servicio: Servicio){
    this._servicioService.deleteServicio(servicio).subscribe(
      (result)=>{
        this.obtenerServicios();
        this.toastr.info('Servicio Eliminado Exitosamente');
      }, 
      (error)=>{
        console.log(error);
      }
    );
  }*/

}
