import { Component, OnInit } from '@angular/core';
import { Afiliado } from 'src/app/models/afiliado';
import { AfiliadoService } from 'src/app/services/afiliado.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-afiliado',
  templateUrl: './afiliado.component.html',
  styleUrls: ['./afiliado.component.css']
})
export class AfiliadoComponent implements OnInit {

  _afiliado: Afiliado;
  _afiliadoAuxiliar: Afiliado;
  _afiliados: Array<Afiliado>;
  _afiliadosAuxiliar: Array<Afiliado>;
  _convertido: string;
  _dniModificar: number;

  constructor(private _afiliadoService: AfiliadoService, private _toastr: ToastrService) {
    this._afiliado = new Afiliado();
    this._afiliadoAuxiliar = new Afiliado();
    this._afiliados = new Array<Afiliado>();
    this._afiliadosAuxiliar = new Array<Afiliado>();
    this._convertido = "";
    this.obtenerAfiliados();
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
          this._afiliadosAuxiliar.push(_afi);
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
  public modificarAfiliado(afiliado) {
    this.validarImagen(afiliado);
    /*console.log(afiliado);
    if (this._dniModificar == afiliado.dni) {
      console.log(this._dniModificar + " - " + afiliado.dni);
      this.validarImagen(afiliado);
    } else {
      console.log("Otro DNI: " + afiliado.dni);
      var _existeDni: boolean = false;
      for (var i in this._afiliadosAuxiliar) {
        if (this._afiliadosAuxiliar[i].dni == afiliado.dni) {
          console.log(this._afiliadosAuxiliar[i].dni);
          console.log("Dentro de IF");
          _existeDni = true;
        }
      }
      if (_existeDni) {
        this._toastr.error("DNI repetido. No se pudo realizar la operación.");
      } else {
        console.log("OKAS");
        this.validarImagen(afiliado);
      }
    }*/
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
    console.log(afiliado);
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

  public auxiliarAfiliado(afiliado) {
    this._dniModificar = afiliado.dni;
    this._afiliadoAuxiliar = afiliado;
  }

  ngOnInit(): void {
  }
}
