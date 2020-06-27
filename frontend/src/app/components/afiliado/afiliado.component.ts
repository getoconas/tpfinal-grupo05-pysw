import { Component, OnInit } from '@angular/core';
import { Afiliado } from 'src/app/models/afiliado';
import { AfiliadoService } from 'src/app/service/afiliado.service';
import { element } from 'protractor';

@Component({
  selector: 'app-afiliado',
  templateUrl: './afiliado.component.html',
  styleUrls: ['./afiliado.component.css']
})
export class AfiliadoComponent implements OnInit {

  _afiliado: Afiliado;
  _afiliados: Array<Afiliado>;
  _convertido: string;

  constructor(private _afiliadoService: AfiliadoService) { 
    this._afiliado = new Afiliado();
    this._afiliados = new Array<Afiliado>();
    this.obtenerAfiliados();
  }

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

  public agregarAfiliado() {
    this._afiliado.imagen = this._convertido;
    console.log(this._afiliado);
    this._afiliadoService.addAfiliado(this._afiliado).subscribe(
      (result) => {
        this.obtenerAfiliados();
        alert('Afiliado Agregado');
      },
      (error) => {
        console.log(error);
      }
    )
    this.limpiarCampos();
  }

  public limpiarCampos() {
    this._afiliado = new Afiliado();
  }

  public cambiarArchivo(file) {
    if (file != null) {
      console.log("Archivo cambiado..", file);
      this._convertido = file[0].base64;
    } else {
      console.log("error");
    }
    
  }

  public modificarAfiliado() {

  }

  public eliminarAfiliado() {
    
  }


  ngOnInit(): void {
  }

}
