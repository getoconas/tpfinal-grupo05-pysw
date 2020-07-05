import { Component, OnInit } from '@angular/core';
import { AfiliadoService } from 'src/app/services/afiliado.service';
import { Afiliado } from 'src/app/models/afiliado';
import { Pago } from 'src/app/models/pago';
import { PagoService } from 'src/app/services/pago.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  _pago: Pago;
  _pagos: Array<Pago>;
  _afiliados: Array<Afiliado>;

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
  public agregarPago() {
    var _existePago: boolean = false;
    for (var i in this._pagos) {
      var id: any = this._pago.afiliado;
      //console.log(id);
      if (this._pagos[i].afiliado._id == id && this._pagos[i].mes == this._pago.mes && this._pagos[i].anio == this._pago.anio) {
        _existePago = true;
      }
    }
    if (_existePago) {
      this._toastr.error("Ya existe pago realizado");
    } else {
      this.agregarPagoService();
    }
  }

  /* Service de Agregar Pago */
  public agregarPagoService() {
    this._pago.fecha = new Date();
    this._pagoService.addPago(this._pago).subscribe(
      (result) => {
        this.listarPagos();
        this.limpiarPago();
        this._toastr.success("Pago Realizado Correctamente");
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

  public limpiarPago() {
    this._pago = new Pago();
  }

  ngOnInit(): void {
  }

}
