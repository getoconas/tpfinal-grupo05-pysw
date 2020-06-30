import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/models/servicio';
import { ServicioService } from 'src/app/services/servicio.service';
import { ToastrService } from 'ngx-toastr';
import { Afiliado } from 'src/app/models/afiliado';
import { AfiliadoService } from 'src/app/services/afiliado.service';


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
  afiliados: Array<Afiliado>;
  afiliadoslista: Array<Afiliado>;
  afiliadoaux:Afiliado;

  constructor(private _servicioService: ServicioService,private toastr:ToastrService,private afiliadoService: AfiliadoService) { 
    this._servicio = new Servicio();
    this._servicio.activo=true;
    this._servicioAuxiliar = new Servicio();
    this._servicios = new Array<Servicio>();
    this.obtenerServicios();
    this.refrescarAfiliados();
  }

  /*Refresca los servicios por si se creo uno nuevo*/
  public obtenerServicios() {
    var servicio:Servicio = new Servicio();
    this._servicios = new Array<Servicio>();
    this._servicioService.getServicios().subscribe(
      (result)=>{(
        result.forEach(element => {
          console.log(result);
          Object.assign(servicio, element);
          this._servicios.push(servicio);
          servicio = new Servicio();
        })
      )},
      (error)=>{
        console.log(error);
      }
    )
    console.log(this._servicio.afiliadosInsc);
  }

/*asigna la imagen procesada y la asigna al servicio 
luego llama a modificarServicioService para completar la accion*/
  public modificarServicio(servicio) {
    if (this._convertido != "") {
      servicio.imagen = this._convertido;
      this.modificarServicioService(servicio);
    } else {
      this.modificarServicioService(servicio);
    }
  }

    /* Verifica que el servicio a agregar no tenga el mismo nombre de uno ya existente */
    public agregarServicio() {
      var _banderaControl: boolean = false;
      for (var i in this._servicios) {
        if (this._servicios[i].nombre == this._servicio.nombre) {
          _banderaControl = true;
        }
      }
      if (_banderaControl) {
        this.toastr.error("Nombre del servicio repetido");
      } else {
        this.agregarServicioService(); 
      }
    }
    

  /* Agrega el nuevo servicio  */
  public agregarServicioService() {
    this._servicio.imagen = this._convertido;
    console.log(this._servicio);
    this._servicioService.addServicio(this._servicio).subscribe(
      (result) => {
        this.obtenerServicios();
        this._convertido = "";
        this.toastr.info('Servicio Agregado Exitosamente');
      },
      (error) => {
        console.log(error);
      }
    )
    this.limpiarCampos();
  }

  /*limpia los campos del formulario */
  public limpiarCampos() {
    this._servicio = new Servicio();
    this.afiliadoaux = new Afiliado();
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

  /* Modifica el  servicio y limpia las variables utilizadas para una proxima operacion*/
  public modificarServicioService(servicio) {
    this._servicioService.updateServicio(servicio).subscribe(
      (result)=>{
        this.obtenerServicios();
        this._servicioAuxiliar = new Servicio();
        this._convertido = "";
        this.toastr.info('Servicio Modificado Exitosamente');

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

  /*En caso de que se haya agregado un nuevo afiliado va a actualizar su lista para 
  permitirme agregar si asi fuere a un servicio */
  refrescarAfiliados(){
    var afiliado:Afiliado = new Afiliado();
    this.afiliados = new Array<Afiliado>();
    this.afiliadoService.getAfiliados().subscribe(
      (result)=>{(
        result.forEach(element => {
          Object.assign(afiliado, element);
          this.afiliados.push(afiliado);
          afiliado = new Afiliado();
        })
      )},
      (error)=>{
        console.log(error);
      }
    )

  }

  /*Asigna el afiliado seleccionado a la lista de afiliados de dicho servicio */
  agregarAfiliado(afiliadoaux){
    this._servicio.afiliadosInsc.push(this.afiliadoaux);
    
  }

 

  borrarAfiliado(afiliado:Afiliado){
    var indice = this._servicio.afiliadosInsc.findIndex((element)=> element._id == afiliado._id);
    this._servicio.afiliadosInsc.splice(indice, 1);
  }

}
