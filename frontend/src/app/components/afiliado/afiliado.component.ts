import { Component, OnInit } from '@angular/core';
// Models
import { Afiliado } from 'src/app/models/afiliado';
import { Servicio } from 'src/app/models/servicio';
import { Pago } from 'src/app/models/pago';
// Services
import { AfiliadoService } from 'src/app/services/afiliado.service';
import { LoginService } from 'src/app/services/login.service';
import { PagoService } from 'src/app/services/pago.service';
import { ServicioService } from 'src/app/services/servicio.service';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as printJS from 'print-js';

@Component({
  selector: 'app-afiliado',
  templateUrl: './afiliado.component.html',
  styleUrls: ['./afiliado.component.css']
})
export class AfiliadoComponent implements OnInit {

  _afiliado: Afiliado;
  _afiliadoAuxiliar: Afiliado;
  _afiliados: Array<Afiliado>;
  _pagos: Array<Pago>;
  _servicios: Array<Servicio>;
  _pagosPrint: Array<any>;

  _convertido: string;
  _dniModificarOriginal: number;
  _dniModificar: number;

  constructor(private _afiliadoService: AfiliadoService, private _pagoService: PagoService, private _servicioService: ServicioService, private _toastr: ToastrService, private _router: Router, private _loginService: LoginService) {
    // Validacion por ruta
    if (!_loginService.userLoggedIn) {
      this._router.navigateByUrl('/login');
    }
    
    this._afiliado = new Afiliado();
    this._afiliadoAuxiliar = new Afiliado();
    this._afiliados = new Array<Afiliado>();
    this._pagosPrint = [];
    this._convertido = "";
    this.obtenerAfiliados();
    this.listarPagos();
    this.obtenerServicios();
  }

  /* Obtiene una lista de afiliados */
  public obtenerAfiliados() {
    this._afiliadoService.getAfiliados().subscribe(
      (result) => {
        this._afiliados = new Array<Afiliado>();
        result.forEach(element => {
          var _afi: Afiliado = new Afiliado();
          Object.assign(_afi, element);
          this._afiliados.push(_afi);
        })
      }
    )
  }

  /* Agrega un afiliado */
  public agregarAfiliado() {
    var _existeDni: boolean = false;
    for (var i in this._afiliados) {
      if (this._afiliados[i].dni == this._afiliado.dni) {
        _existeDni = true;
      }
    }
    if (_existeDni) {
      this._toastr.error("DNI repetido");
    } else {
      this.agregarAfiliadoService(this._afiliado);
    }
  }

  /* Service de Agregar Afiliado */
  public agregarAfiliadoService(_afiliado) {
    this._afiliado.imagen = this._convertido;
    this._afiliadoService.addAfiliado(this._afiliado).subscribe(
      (result) => {
        this.obtenerAfiliados();
        this._convertido = "";
        this._toastr.success("Afiliado Agregado Correctamente");
      },
      (error) => {
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

  /* Modifica un afiliado */
  public modificarAfiliado(afiliado) {
    if (this._dniModificar == this._dniModificarOriginal) {
      afiliado.dni = this._dniModificar;
      this.validarImagen(afiliado);
    } else {
      var _existeDni: boolean = false;
      for (var i in this._afiliados) {
        if (this._afiliados[i].dni == this._dniModificar) {
          _existeDni = true;
        }
      }
      if (_existeDni) {
        this._toastr.error("DNI repetido. No se pudo realizar la operación.");
      } else {
        afiliado.dni = this._dniModificar;
        this.validarImagen(afiliado);
      }
    }
  }

  /* Valida si hubo un cambio de imagen */
  public validarImagen(afiliado) {
    if (this._convertido != "") {
      afiliado.imagen = this._convertido
      this.modificarAfiliadoService(afiliado);
    } else {
      this.modificarAfiliadoService(afiliado);
    }
  }

  /* Service de Modificar Afiliado */
  public modificarAfiliadoService(afiliado) {
    this._afiliadoService.updateAfiliado(afiliado).subscribe(
      (result) => {
        this.obtenerAfiliados();
        this._afiliadoAuxiliar = new Afiliado();
        this._convertido = "";
        this._toastr.info("Afiliado Modificado Correctamente");
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /* Elimina un afiliado */
  public eliminarAfiliado(afiliado) {
    var _existePago = false;
    var _existeServicio = false;

    for (var i in this._pagos) {
      if (this._pagos[i].afiliado._id == afiliado._id) {
        _existePago = true;
      }
    }
    for(var j in this._servicios) {
      for (var k in this._servicios[j].afiliadosInsc) {
        if (this._servicios[j].afiliadosInsc[k]._id == afiliado._id) {
          _existeServicio = true;
        }
      }
    }
    if (_existePago || _existeServicio) {
      this._toastr.error("NO se puede eliminar el afiliado");
    } else {
      this.eliminarServiceAfiliado(afiliado);
    }
  }

  /* Service de Eliminar Afiliado */
  public eliminarServiceAfiliado(afiliado) {
    this._afiliadoService.deleteAfiliado(afiliado._id).subscribe(
      (result) => {
        this.obtenerAfiliados();
        this._afiliadoAuxiliar = new Afiliado();
        this._toastr.info("Afiliado Eliminado Correctamente");
      },
      (error) => {
        console.log(error);
      }
    )
  }

  /* Obtiene lista de pagos */
  public listarPagos() {
    this._pagoService.getPagos().subscribe(
      (result) => {
        this._pagos = new Array<Pago>();
        result.forEach(element => {
          var _pay: Pago = new Pago();
          Object.assign(_pay, element);
          this._pagos.push(_pay);
        });
      },
      (error) => {
        console.log(error);
      }
    )
  }

  /* Obtiene lista de servicios */
  public obtenerServicios() {
    this._servicioService.getServicios().subscribe(
      (result) => {
        this._servicios = new Array<Servicio>();  
        result.forEach(element => {
          var _ser: Servicio = new Servicio();
          Object.assign(_ser, element);
          this._servicios.push(_ser);
        })
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  /* Imprime un listado afiliados de acuerdo a los pagos realizados */
  public imprimirPagosPorAfiliado(afiliado) {
    this._pagosPrint = [];
    for (var i in this._pagos) {
      if (this._pagos[i].afiliado._id == afiliado._id) {
        this._pagosPrint.push({
          'fechaPago': this.convertirFecha(this._pagos[i].fecha),
          'mes': this._pagos[i].mes,
          'anio': this._pagos[i].anio,
          'monto': '$ '+ this._pagos[i].monto
        });
      }
    }
    if (this._pagosPrint.length > 0) {
      this.imprimirPagosPrint(afiliado.apellido, afiliado.nombres, afiliado.dni);
    } else {
      this._toastr.error("El afiliado no tiene pagos realizados");
    }
  }

  /* Obtiene el PDF con el listado de afiliados segun los pagos realizados */
  public imprimirPagosPrint(apellido, nombre, dni) {
    printJS({
      printable: this._pagosPrint, 
      properties: [
        { field: 'fechaPago', displayName: 'Fecha de Pago' },
        { field: 'mes', displayName: 'Mes' },
        { field: 'anio', displayName: 'Año' },
        { field: 'monto', displayName: 'Monto' }
      ],
      header: '<h3 class="text-center">Listado de Pagos del Afiliado: '+ apellido + ', ' + nombre + ' - DNI: '+ dni +'</h3>',
      type: 'json'
    });
  }

  /* Convierte una fecha en formato ISO a dd/mm/yyyy */
  public convertirFecha(fecha) {
    var date = new Date(fecha);
    if (!isNaN(date.getTime())) {
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }
  }

  public limpiarCampos() {
    this._afiliado = new Afiliado();
  }

  public auxiliarAfiliado(afiliado) {
    this._dniModificarOriginal = afiliado.dni;
    this._dniModificar = afiliado.dni;
    this._afiliadoAuxiliar = afiliado;
  }

  ngOnInit(): void {
  }
}
