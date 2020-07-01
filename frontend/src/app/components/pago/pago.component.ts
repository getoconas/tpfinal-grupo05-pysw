import { Component, OnInit } from '@angular/core';
import { AfiliadoService } from 'src/app/services/afiliado.service';
import { Afiliado } from 'src/app/models/afiliado';
import { Pago } from 'src/app/models/pago';
import { PagoService } from 'src/app/services/pago.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  _pago: Pago;
  _pagos: Array<Pago>;
  _afiliados: Array<Afiliado>;

  constructor(private _afiliadoService: AfiliadoService, private _pagoService: PagoService, private _toastr: ToastrService) { 
    this._pago = new Pago();
    this._pagos = new Array<Pago>();
    this._afiliados = new Array<Afiliado>();
    this.listarAfiiados();
    this.listarPagos();
  }

  /* Agregar Pago */
  public agregarPago() {
    this._pago.fecha = new Date();
    console.log(this._pago);
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
        console.log(result);
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
