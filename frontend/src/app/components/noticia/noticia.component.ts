import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {

  constructor( private router:Router, private loginService: LoginService) { 
    //validacion por ruta
    if (!loginService.userLoggedIn) {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit(): void {
  }

}
