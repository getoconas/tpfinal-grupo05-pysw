import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';





import { FormsModule } from '@angular/forms'
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { PagoComponent } from './components/pago/pago.component';
import { AfiliadoComponent } from './components/afiliado/afiliado.component';
import { NovedadComponent } from './components/novedad/novedad.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { NoticiaComponent } from './components/noticia/noticia.component';

import { LoginService } from './services/login.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactoComponent,
    NosotrosComponent,
    InicioComponent,
    ServicioComponent,
    PagoComponent,
    AfiliadoComponent,
    NovedadComponent,
    HeaderComponent,
    FooterComponent,
    UsuarioComponent,
    NoticiaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AlifeFileToBase64Module,
    HttpClientModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
