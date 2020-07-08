import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/models/servicio';
import { ServicioService } from 'src/app/services/servicio.service';
import { ToastrService } from 'ngx-toastr';
import { Afiliado } from 'src/app/models/afiliado';
import { AfiliadoService } from 'src/app/services/afiliado.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import * as printJS from 'print-js';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
  
  _afiliadosPrint : Array<any>;
  _servicio: Servicio;
  _servicioAuxiliar: Servicio;
  _servicios: Array<Servicio>;
  _convertido: string;
  afiliados: Array<Afiliado>;
  afiliadoslista: Array<Afiliado>;
  afiliadoaux:Afiliado;
  _servicioExtra: Array<any>;
  seleccion:boolean = false;
  

  constructor(private _servicioService: ServicioService, private _toastr: ToastrService, private afiliadoService: AfiliadoService, private router:Router, private loginService: LoginService) { 
     //validacion por ruta
     if (!loginService.userLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    
    this._servicio = new Servicio();
    this._servicio.activo=true;
    
    this._servicioAuxiliar = new Servicio();
    this._servicios = new Array<Servicio>();
    this._servicioExtra = [];
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
          Object.assign(servicio, element);
          this._servicios.push(servicio);
          servicio = new Servicio();
        })
      )},
      (error)=>{
        console.log(error);
      }
    )
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
      this.msgError('El servicio ingresado ya existe.');
    } else {
      this.agregarServicioService(); 
    }
  }
    
  /* Agrega el nuevo servicio  */
  public agregarServicioService() {
    this._servicio.imagen = this._convertido;
    this._servicioService.addServicio(this._servicio).subscribe(
      (result) => {
        this.obtenerServicios();
        this._convertido = "";
        this.msgSuccess('Agregado correctamente.');
      },
      (error) => {
        console.log(error);
      }
    )
    this.limpiarCampos();
  }

  /*limpia los campos del formulario */
  public limpiarCampos() {
    this.seleccion = false;
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

  /* Modifica el  servicio y limpia las variables utilizadas para una proxima operacion*/
  public modificarServicioService(servicio) {
    this._servicioService.updateServicio(servicio).subscribe(
      (result)=>{
        this.obtenerServicios();
        this._servicioAuxiliar = new Servicio();
        this._convertido = "";
        this.msgInfo('Modificado correctamente.');
      },
      (error)=>{
        console.log(error);
      }
    );
    this.limpiarCampos();
  }

  /* Elimina un servicio */
  public eliminarServicio(servicio) {
    if(servicio.activo==false){
      this._servicioService.deleteServicio(servicio._id).subscribe(
        (result) => {
          this.obtenerServicios();
          this.msgInfo('Eliminado correctamente.');
        },
        (error) => {
          console.log(error);
        }
      )
    } else {
      this.msgError('Existe servicio activo.');
    }
  }

  public auxiliarServicio(servicio) {
    this._servicioAuxiliar = servicio;
  }

  public seleccionarServicio(servicio: Servicio) {
    this.seleccion = true;
    var tservicio = new Servicio();
    Object.assign(tservicio,servicio);
    this._servicio = tservicio;
  }

  /*En caso de que se haya agregado un nuevo afiliado va a actualizar su lista para 
  permitirme agregar si asi fuere a un servicio */
  refrescarAfiliados() {
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

  /*Controla que no hayan repetidos y Asigna el afiliado seleccionado 
  a la lista de afiliados de dicho servicio */
  agregarAfiliado(afiliadoaux){
    var _banderaControl: boolean = false;
    for (var i in this._servicio.afiliadosInsc) {
      if (this._servicio.afiliadosInsc[i].dni == this.afiliadoaux.dni) {
        _banderaControl = true;
      }
    }
    if (_banderaControl) {
      this.msgError('El afiliado ya cuenta con el servicio.');
    } else {
      this._servicio.afiliadosInsc.push(this.afiliadoaux);
      this.msgInfo('Haga click en *Modificar para registrar los nuevos afiliados al servicio.');    
      this.afiliadoaux = new Afiliado();
    }
  }

  borrarAfiliado(afiliado:Afiliado){
    var indice = this._servicio.afiliadosInsc.findIndex((element)=> element._id == afiliado._id);
    this._servicio.afiliadosInsc.splice(indice, 1);
  }

  public imprimirServicio(servicio: Servicio) {
    this._afiliadosPrint = [];
    for (var i in servicio.afiliadosInsc) {      
      this._afiliadosPrint.push({
        'apellido': servicio.afiliadosInsc[i].apellido,
        'nombres': servicio.afiliadosInsc[i].nombres,
        'dni': servicio.afiliadosInsc[i].dni,
        'telefono': servicio.afiliadosInsc[i].telefono
      });
    }
    if (this._afiliadosPrint.length > 0) {
      this.imprimirAfiliadosPrint(servicio.nombre);
    } else {
      this.msgError('No tiene afiliados asignados.');
    }
  }

  public imprimirAfiliadosPrint(nombre) {
    printJS({
      printable: this._afiliadosPrint, 
      properties: [
        { field: 'apellido', displayName: 'Apellido' },
        { field: 'nombres', displayName: 'Nombres' },
        { field: 'dni', displayName: 'Dni' },
        { field: 'telefono', displayName: 'Telefono' }
      ],
      header: '<h3 class="text-center">Listado de Afiliados al servicio: '+nombre+'</h3>',
      type: 'json'
    });
  }

  /* Imprime una lista de afiliados en servicios */
  public imprimirServicios() {
    if (this._servicios.length > 0) {
      this._servicioExtra = [];
      for (var i in this._servicios) {
        for (var j in this._servicios[i].afiliadosInsc) {
          this._servicioExtra.push({ 
            'nombre': this._servicios[i].nombre,
            'dni': this._servicios[i].afiliadosInsc[j].dni,
            'apellido': this._servicios[i].afiliadosInsc[j].apellido,
            'nombreAfiliado': this._servicios[i].afiliadosInsc[j].nombres
          });
        }
      }
      printJS({
        printable: this._servicioExtra, 
        properties: [
          { field: 'nombre', displayName: 'Servicio' },
          { field: 'dni', displayName: 'DNI' },
          { field: 'apellido', displayName: 'Apellido' },
          { field: 'nombreAfiliado', displayName: 'Nombres' }
        ],
        header: '<h3 class="text-center">Listado de Servicios con Afiliados</h3>',
        type: 'json'
      });
    } else {
      this.msgError('No posee servicios para imprimir.');
    }
  }

  mostrarEstado(estado:Boolean) {
    if(estado == true) {
      return "Activo"
    } else {
      return "Inactivo"
    }
  }

  /* --- Inicio - Toastr - Mensajes que se muestran en pantalla ---*/
  private msgSuccess(_msg) {
    this._toastr.success('Servicio: ' + _msg, 'Éxito');
  }
  
  private msgError(_msg) {
    this._toastr.error('Servicio: ' + _msg, 'Error');
  }

  private msgInfo(_msg) {
    this._toastr.info('Servicio: ' + _msg, 'Info');
  }  
  /* --- Fin - Toastr - Mensajes que se muestran en pantalla ---*/

  ngOnInit(): void {
  }
}
