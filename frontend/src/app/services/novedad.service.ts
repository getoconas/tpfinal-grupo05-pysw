import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Novedad } from '../models/novedad';

@Injectable({
  providedIn: 'root'
})
export class NovedadService {

  URL: string = "http://localhost:3000/api/novedades/";

  constructor(private _http: HttpClient) { }

   /* Lista de Novedades */
   public getNovedades(): Observable<any> {
    return this._http.get(this.URL);
  }

  /* Alta de Novedad */
  public addNovedad(_novedad: Novedad): Observable<any> {
    const _httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var _body = JSON.stringify(_novedad);

    return this._http.post(this.URL, _body, _httpOptions);
  }

  /* Modificacion de Novedad */
  public updateNoticia(_novedad: Novedad) :Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var body = JSON.stringify(_novedad);
    return this._http.put(this.URL + _novedad._id , body , httpOptions );
  }

  /* Baja de Novedad */
  public deleteNovedad(_novedad: Novedad):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
  
      })
    };
    return this._http.delete( this.URL + _novedad._id , httpOptions );
  }

}
