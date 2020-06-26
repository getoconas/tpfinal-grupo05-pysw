import { Component, OnInit } from '@angular/core';
import { Afiliado } from 'src/app/models/afiliado';

@Component({
  selector: 'app-afiliado',
  templateUrl: './afiliado.component.html',
  styleUrls: ['./afiliado.component.css']
})
export class AfiliadoComponent implements OnInit {

  _afiliado: Afiliado;

  constructor() { 
    this._afiliado = new Afiliado();
  }

  public guardarAfiliado() {

  }

  public modificarAfiliado() {

  }

  public eliminarAfiliado() {
    
  }

  ngOnInit(): void {
  }

}
