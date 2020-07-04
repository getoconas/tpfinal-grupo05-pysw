import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { ActivatedRoute, Router} from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userform: Usuario = new Usuario();
  returnUrl: string;
  msglogin: string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService:LoginService) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/inicio';      
  }


  login() {
    this.loginService.login(this.userform.usuario, this.userform.password)
        .subscribe(
            (result) => {
                  var user = result;
                  console.log(user);
                  if (user.status == 1){
                      //vbles para mostrar-ocultar cosas en el header
                      this.loginService.userLoggedIn = true;
                      this.loginService.userLogged = user;
                      //redirigimos a home o a pagina que llamo
                      this.router.navigateByUrl(this.returnUrl);
                  } else {
                    //usuario no encontrado  muestro mensaje en la vista
                    this.msglogin="Credenciales incorrectas..";
			}
            },
            error => {
                console.log("error en conexion");
                console.log(error);
            });
  }


}
