import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pago } from '../models/pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  URL: string = "http://localhost:3000/api/pagos"

  constructor(private _http: HttpClient) { }

  /* Lista de Pagos */
  public getPagos(): Observable<any> {
    return this._http.get(this.URL);
  }

  /* Alta de Pago */
  public addPago(_pago: Pago): Observable<any> {
    const _httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var _body = JSON.stringify(_pago);

    return this._http.post(this.URL, _body, _httpOptions);
  }

  /* Modificacion de Pago */
  public updatePago(_pago: Pago) {
    return this._http.put(this.URL + "/" + _pago._id, _pago);
  }

  /* Baja de Pago */
  public deletePago(_id: any) {
    return this._http.delete(this.URL + "/" + _id);
  }
}
