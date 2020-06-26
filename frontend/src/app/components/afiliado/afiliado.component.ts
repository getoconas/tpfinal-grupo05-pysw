import { Component, OnInit } from '@angular/core';
import { Afiliado } from 'src/app/models/afiliado';

@Component({
  selector: 'app-afiliado',
  templateUrl: './afiliado.component.html',
  styleUrls: ['./afiliado.component.css']
})
export class AfiliadoComponent implements OnInit {

  _afiliado: Afiliado;
  _convertido: string;

  constructor() { 
    this._afiliado = new Afiliado();
  }

  public guardarAfiliado() {

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
