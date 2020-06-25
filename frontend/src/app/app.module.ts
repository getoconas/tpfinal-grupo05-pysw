import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { PagoComponent } from './components/pago/pago.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactoComponent,
    NosotrosComponent,
    InicioComponent,
    ServicioComponent,
    PagoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
