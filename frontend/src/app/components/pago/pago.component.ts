import { Component, OnInit } from '@angular/core';
import { AfiliadoService } from 'src/app/services/afiliado.service';
import { Afiliado } from 'src/app/models/afiliado';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  _afiliados: Array<Afiliado>;

  constructor(private afiliadoService: AfiliadoService) { 
    this._afiliados = new Array<Afiliado>();
    this.listarEmpresas();
  }

  public listarEmpresas() {
    this.afiliadoService.getAfiliados().subscribe(
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
  
  ngOnInit(): void {
  }

}
