import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  URL: string = "http://localhost:3000/api/servicios/";

  constructor(private _http: HttpClient) { }

  /* Lista de Servicios */
  public getServicios(): Observable<any> {
    return this._http.get(this.URL);
  }

  /* Alta de Servicio */
  public addServicio(_servicio: Servicio): Observable<any> {
    const _httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var _body = JSON.stringify(_servicio);

    return this._http.post(this.URL, _body, _httpOptions);
  }

   /* Modificacion de Servicio */
   public updateServicio(_servicio: Servicio) {
    return this._http.put(this.URL + "/" + _servicio._id, _servicio);
  }

  /* Baja de Servicio */
  public deleteServicio(_id: any) {
    return this._http.delete(this.URL + "/" + _id);
  }
}
