import { Component, OnInit } from '@angular/core';
import { Afiliado } from 'src/app/models/afiliado';
import { AfiliadoService } from 'src/app/services/afiliado.service';
import { element } from 'protractor';

@Component({
  selector: 'app-afiliado',
  templateUrl: './afiliado.component.html',
  styleUrls: ['./afiliado.component.css']
})
export class AfiliadoComponent implements OnInit {

  _afiliado: Afiliado;
  _afiliadoAuxiliar: Afiliado;
  _afiliados: Array<Afiliado>;
  _convertido: string;

  constructor(private _afiliadoService: AfiliadoService) { 
    this._afiliado = new Afiliado();
    this._afiliadoAuxiliar = new Afiliado();
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

  /* Agrega un afiliado */
  public agregarAfiliado() {
    this._afiliado.imagen = this._convertido;
    console.log(this._afiliado);
    this._afiliadoService.addAfiliado(this._afiliado).subscribe(
      (result) => {
        this.obtenerAfiliados();
        this._convertido = "";
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
  public modificarAfiliado() {

  }

  /* Elimina un afiliado */
  public eliminarAfiliado(afiliado) {
    console.log(afiliado);
    this._afiliadoService.deleteAfiliado(afiliado._id).subscribe(
      (result) => {
        this.obtenerAfiliados();
        alert("Afiliado Eliminado");
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public auxiliarAfiliado(afiliado) {
    this._afiliadoAuxiliar = afiliado;
  }

  ngOnInit(): void {
  }
}
