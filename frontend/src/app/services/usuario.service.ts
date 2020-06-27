import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL: string = "http://localhost:3000/api/usuarios";

  constructor(private _http: HttpClient) { }

  /* Lista de Usuarios */
  public getUsuarios(): Observable<any> {
    return this._http.get(this.URL);
  }

  /* Alta de Usuario */
  public addUsuario(_usuario: Usuario): Observable<any> {
    const _httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    var _body = JSON.stringify(_usuario);

    return this._http.post(this.URL, _body, _httpOptions);
  }

  /* Modificacion de Usuario */
  public updateUsuario(_usuario: Usuario) {
    return this._http.put(this.URL + "/" + _usuario._id, _usuario);
  }

  /* Baja de Usuario */
  public deleteUsuario(_id: any) {
    return this._http.delete(this.URL + "/" + _id);
  }
}
