import { Component, OnInit } from '@angular/core';
// Models
import { Afiliado } from 'src/app/models/afiliado';
import { Servicio } from 'src/app/models/servicio';
import { Pago } from 'src/app/models/pago';
import { Usuario } from 'src/app/models/usuario';
// Services
import { AfiliadoService } from 'src/app/services/afiliado.service';
import { LoginService } from 'src/app/services/login.service';
import { PagoService } from 'src/app/services/pago.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
// Libraries
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
  _usuario: Usuario;
  _afiliados: Array<Afiliado>;
  _usuarios: Array<Usuario>;
  _pagos: Array<Pago>;
  _servicios: Array<Servicio>;
  _pagosPrint: Array<any>;

  _tieneUsuario: boolean = false;
  _existeDni: boolean = false;

  _convertido: string;
  _dniModificarOriginal: number;
  _dniModificar: number;
  _correoModificar: string;

  constructor(private _afiliadoService: AfiliadoService, private _pagoService: PagoService, private _servicioService: ServicioService, private _toastr: ToastrService, private _router: Router, private _loginService: LoginService, private _usuarioService: UsuarioService) {
    // Validacion por ruta
    if (!_loginService.userLoggedIn) {
      this._router.navigateByUrl('/login');
    }
    
    this._afiliado = new Afiliado();
    this._afiliadoAuxiliar = new Afiliado();
    this._usuario = new Usuario();
    this._afiliados = new Array<Afiliado>();
    this._convertido = "";
    this.obtenerAfiliados();
    this.listarPagos();
    this.obtenerServicios();
    this.obtenerUsuarios();
  }

  /* --- Inicio - Metodos de ABM --- */
  /* Agrega un afiliado */
  public agregarAfiliado() {
    this.existeDniIngresado(this._afiliado.dni);
    if (this._existeDni) {
      this.msgError('El DNI ingresado ya esta existe.');
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
        this.msgSuccess('Agregado correctamente.');
        this.limpiarCampos();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /* Modifica un afiliado */
  public modificarAfiliado(afiliado) {
    this.validarAfiliadoUsuario(afiliado);
    if (this._dniModificar == this._dniModificarOriginal) {
      afiliado.dni = this._dniModificar;
      this.validarImagen(afiliado);
    } else {
      this.existeDniIngresado(this._dniModificar);
      if (this._existeDni) {
        this.msgError('El DNI ingresado ya esta existe.');
      } else {
        afiliado.dni = this._dniModificar;
        this.validarImagen(afiliado);
      }
    }
  }

  /* Service de Modificar Afiliado */
  public modificarAfiliadoService(afiliado) {
    this._afiliadoService.updateAfiliado(afiliado).subscribe(
      (result) => {
        this.obtenerAfiliados();
        this._afiliadoAuxiliar = new Afiliado();
        this._convertido = "";
        this.msgInfo('Modificado correctamente.');
        this.limpiarCampos();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  /* Elimina un afiliado */
  public eliminarAfiliado(afiliado) {
    var _existePago: boolean = false;
    var _existeServicio: boolean = false;
    var _existeUsuario: boolean = false;

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
    for (var l in this._usuarios) {
      if (this._usuarios[l].usuario == afiliado.email) {
        _existeUsuario = true;
      }
    }
    this.existeRelacionConAfiliado(_existePago, _existeServicio, _existeUsuario, afiliado)
  }

  /* Service de Eliminar Afiliado */
  public eliminarServiceAfiliado(afiliado) {
    this._afiliadoService.deleteAfiliado(afiliado._id).subscribe(
      (result) => {
        this.obtenerAfiliados();
        this._afiliadoAuxiliar = new Afiliado();
        this.msgInfo('Eliminado correctamente');
      },
      (error) => {
        console.log(error);
      }
    )
  }
  /* --- Fin - Metodos de ABM --- */

  /* Verifica si el afiliado tiene usuario */
  public validarAfiliadoUsuario(afiliado) {
    if (this._tieneUsuario) {
      this._usuario.usuario = afiliado.email;
      this.modificarUsuario();
    }
  }

  /* Busca si el afiliado tiene usuario */
  public buscarUsuario(email) {
    for (var i in this._usuarios) {
      if (this._usuarios[i].usuario == email) {
        this._usuario = this._usuarios[i];
        this._tieneUsuario = true;
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

  /* Verifica si ya existe el DNI ingresado */
  public existeDniIngresado(dniBuscado) {
    this._existeDni = false;
    for (var i in this._afiliados) {
      if (this._afiliados[i].dni == dniBuscado) {
        this._existeDni = true;
      }
    }
  }

  /* 
    Muestra diferentes tipos de mensajes de acuerdo si el afiliado tiene pago, servicio y/o usuario
    También llama al método de borrar un afiliado sino no cumple con las condiciones anteriores
  */
 public existeRelacionConAfiliado(_existePago, _existeServicio, _existeUsuario, afiliado) {
  if (_existePago && _existeServicio && _existeUsuario) {
    this.msgError('Posee pago, servicio y usuario.');
  } else if (_existePago && _existeServicio) {
    this.msgError('Posee pago y servicio.');
  } else if (_existePago && _existeUsuario) {
    this.msgError('Posee pago y usuario.');
  } else if (_existeServicio && _existeUsuario) {
    this.msgError('Posee servicio y usuario.');
  } else if (_existePago) {
    this.msgError('Posee pago.');
  } else if (_existeServicio) {
    this.msgError('Posee servicio.');
  } else if (_existeUsuario) {
    this.msgError('Posee usuario.');
  } else {
    this.eliminarServiceAfiliado(afiliado);
  }
}

  /* Modifica un usuario */
  public modificarUsuario(){
    this._usuarioService.updateUsuario(this._usuario).subscribe(
      (result) => {
        this._usuario = new Usuario();
        this.obtenerUsuarios();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /* --- Inicio - Listas de Afiliados, Usuarios, Pagos y Servicios --- */
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

  /* Obtiene lista de usuarios */
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
  /* --- Fin - Listas de Afiliados, Usuarios, Pagos y Servicios --- */

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
      this.msgError('No tiene pagos realizados');
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

  /* Convierte una imagen a string */
  public convertirArchivo(file) {
    if (file != null) {
      console.log("Archivo cambiado..", file);
      this._convertido = file[0].base64;
    } else {
      console.log("error");
    }
  }

  /* Convierte una fecha en formato ISO a dd/mm/yyyy */
  public convertirFecha(fecha) {
    var date = new Date(fecha);
    if (!isNaN(date.getTime())) {
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }
  }

  /* --- Inicio - Toastr - Mensajes que se muestran en pantalla ---*/
  private msgSuccess(_msg) {
    this._toastr.success('Afiliado: ' + _msg, 'Éxito');
  }
  
  private msgError(_msg) {
    this._toastr.error('Afiliado: ' + _msg, 'Error');
  }

  private msgInfo(_msg) {
    this._toastr.info('Afiliado: ' + _msg, 'Info');
  }  
  /* --- Fin - Toastr - Mensajes que se muestran en pantalla ---*/

  public limpiarCampos() {
    this._afiliado = new Afiliado();
  }

  public auxiliarAfiliado(afiliado) {
    this._dniModificarOriginal = afiliado.dni;
    this._dniModificar = afiliado.dni;
    this._afiliadoAuxiliar = afiliado;
    this.buscarUsuario(afiliado.email);
  }

  ngOnInit(): void {
  }
}