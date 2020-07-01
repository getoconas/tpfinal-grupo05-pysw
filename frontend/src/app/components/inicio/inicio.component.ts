import { Component, OnInit } from '@angular/core';
import { NoticiaService } from 'src/app/services/noticia.service';
import { Noticia } from 'src/app/models/noticia';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  _noticias: Array<Noticia>;
  constructor(private _noticiaService:NoticiaService) {
    this._noticias = new Array<Noticia>();
    this.obtenerNoticias();
   }

  ngOnInit(): void {
  }

  public obtenerNoticias() {
    this._noticiaService.getNoticias().subscribe(
      (result) => {
        this._noticias = new Array<Noticia>();
        result.forEach(element => {
          var _noti: Noticia = new Noticia();
          Object.assign(_noti, element);
          this._noticias.push(_noti);
        })
      }
    )
  }

}
