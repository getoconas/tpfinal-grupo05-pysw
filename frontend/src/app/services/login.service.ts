import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userLoggedIn: boolean = false;
  userLogged: Usuario;


  constructor(private _http:HttpClient) { }


  public login(usuario: string, password: string):Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }) 
    } 
    let body = JSON.stringify({ usuario: usuario, password: password });
    return this._http.post('http://localhost:3000/api/usuarios/login', body, httpOption);
  }

  public logout() {
    // reseteo las propiedades del service que indican 
    // que un usuari esta logueado y cual es el usuario logueado
    this.userLogged = new Usuario();
    this.userLoggedIn = false;  
  }  


  public getUsuarios():Observable<any>{

    const httpOption = {
      headers: new HttpHeaders({
      }) 
    }

    return this._http.get("http://localhost:3000/api/usuarios/", httpOption);

  }


}
