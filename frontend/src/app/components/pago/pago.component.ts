import { Component, OnInit } from '@angular/core';
// Models
import { Pago } from 'src/app/models/pago';
import { Afiliado } from 'src/app/models/afiliado';
// Services
import { AfiliadoService } from 'src/app/services/afiliado.service';
import { PagoService } from 'src/app/services/pago.service';
import { LoginService } from 'src/app/services/login.service';
// Libraries
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as printJS from 'print-js';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  _pago: Pago;
  _pagos: Array<Pago>;
  _afiliados: Array<Afiliado>;

  _existePago: boolean = false;

  constructor(private _afiliadoService: AfiliadoService, private _pagoService: PagoService, private _toastr: ToastrService, private router:Router, private _loginService: LoginService) { 
    // Validacion por ruta  
    if (!_loginService.userLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    
    this._pago = new Pago();
    this._pagos = new Array<Pago>();
    this._afiliados = new Array<Afiliado>();
    this.listarAfiiados();
    this.listarPagos();
  }

  /* Agregar Pago */
  public agregarPago(contentPrint) {
    this.existePagoRealizado();
    if (this._existePago) {
      this.msgError('Ya existe pago realizado.');
    } else {
      this.agregarPagoService(contentPrint);
    }
  }

  /* Service de Agregar Pago */
  public agregarPagoService(contentPrint) {
    this._pago.fecha = new Date();
    this._pagoService.addPago(this._pago).subscribe(
      (result) => {
        this.listarPagos();
        this.limpiarPago();
        this.msgSuccess('Realizado correctamente');
        this.imprimirComprobantePago(contentPrint);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  /* Obtiene lista de afiliados */
  public listarAfiiados() {
    this._afiliadoService.getAfiliados().subscribe(
      (result) => {
        this._afiliados = new Array<Afiliado>();
        result.forEach(element => {
          var _afi: Afiliado = new Afiliado();
          Object.assign(_afi, element);
          this._afiliados.push(_afi);
        });
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

  /* Verifica si ya existe pago realizado */
  public existePagoRealizado() {
    this._existePago = false;
    for (var i in this._pagos) {
      var id: any = this._pago.afiliado;
      if (this._pagos[i].afiliado._id == id && this._pagos[i].mes == this._pago.mes && this._pagos[i].anio == this._pago.anio) {
        this._existePago = true;
      }
    }
  }

  public imprimirComprobantePago(contentPrint) {
    printJS({
      printable: contentPrint, 
      type: 'html',
      header: '<h3 class="text-center">Comprobante de Pago</h3>'
    });
  }

  /* --- Inicio - Toastr - Mensajes que se muestran en pantalla ---*/
  private msgSuccess(_msg) {
    this._toastr.success('Pago: ' + _msg, 'Éxito');
  }
  
  private msgError(_msg) {
    this._toastr.error('Pago: ' + _msg, 'Error');
  }

  /* --- Fin - Toastr - Mensajes que se muestran en pantalla ---*/

  public limpiarPago() {
    this._pago = new Pago();
  }

  ngOnInit(): void {
  }
}
