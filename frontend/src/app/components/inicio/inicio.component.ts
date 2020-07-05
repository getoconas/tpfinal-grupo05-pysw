import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
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
      //funcion que muestra la descripcion de la card
    $(document).ready(function(){ 
      $('[class^="card"]').on('mouseenter', function() {
        $(this).find('.card-text').slideDown(300);
      });
      //funcion q oculta la descripcion de la card
      $('[class^="card"]').on('mouseleave', function(event) {
        $(this).find('.card-text').css({
          'display': 'none'
        });
      });
    })

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
