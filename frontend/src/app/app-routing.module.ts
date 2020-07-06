import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AfiliadoComponent } from './components/afiliado/afiliado.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { NoticiaComponent } from './components/noticia/noticia.component';
import { FooterComponent } from './components/footer/footer.component';
import { NovedadComponent } from './components/novedad/novedad.component';
import { PagoComponent } from './components/pago/pago.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { HeaderComponent } from './components/header/header.component';


const routes: Routes = [
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'afiliado', component: AfiliadoComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'noticia', component: NoticiaComponent },
  { path: 'novedad', component: NovedadComponent },
  { path: 'pago', component: PagoComponent },
  { path: 'servicio', component: ServicioComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: '**', pathMatch:'full', redirectTo:'inicio' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
