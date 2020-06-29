import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Afiliado } from '../models/afiliado';

@Injectable({
  providedIn: 'root'
})
export class AfiliadoService {
  URL: string = "http://localhost:3000/api/afiliados";

  constructor(private _http: HttpClient) { }

  /* Lista de Afiliados */
  public getAfiliados(): Observable<any> {
    return this._http.get(this.URL);
  }

  /* Alta de Afiliado */
  public addAfiliado(_afiliado: Afiliado): Observable<any> {
    const _httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var _body = JSON.stringify(_afiliado);

    return this._http.post(this.URL, _body, _httpOptions);
  }

  /* Modificacion de Afiliado */
  public updateAfiliado(_afiliado: Afiliado) {
    return this._http.put(this.URL + "/" + _afiliado._id, _afiliado);
  }

  /* Baja de Afiliado */
  public deleteAfiliado(_id: any) {
    return this._http.delete(this.URL + "/" + _id);
  }
}
