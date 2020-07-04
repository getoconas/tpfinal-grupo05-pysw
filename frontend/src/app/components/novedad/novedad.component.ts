import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Novedad } from 'src/app/models/novedad';
import { NovedadService } from 'src/app/services/novedad.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-novedad',
  templateUrl: './novedad.component.html',
  styleUrls: ['./novedad.component.css']
})
export class NovedadComponent implements OnInit {

  _novedad: Novedad;
  _novedades: Array<Novedad>;

  constructor( private _novedadService: NovedadService, private toastr:ToastrService, private router:Router, private loginService: LoginService) {
    //validacion por ruta
    if (!loginService.userLoggedIn) {
      this.router.navigateByUrl('/login');
    }

    this._novedad = new Novedad();
    this._novedad.estado=false;
    this._novedades = new Array<Novedad>();
    this.obtenerNovedades();
   }

  ngOnInit(): void {
  }

  obtenerNovedades(){
    this._novedadService.getNovedades().subscribe(
      (result) => {
        this._novedades = new Array<Novedad>();
        result.forEach(element => {
          var _nov: Novedad = new Novedad();
          Object.assign(_nov, element);
          this._novedades.push(_nov);
        })
      }
    )
  }

}
