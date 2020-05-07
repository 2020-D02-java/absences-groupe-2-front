import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthComponent} from './auth/auth.component';
import {TechComponent} from './tech/tech.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CreationJourFerieComponent } from './jourFerie/creation-jour-ferie/creation-jour-ferie.component';
import { ListerJourFerieComponent } from './jourFerie/lister-jour-ferie/lister-jour-ferie.component';
import { AccesRefuseComponent } from './erreurNavigation/acces-refuse/acces-refuse.component';
import { FourOhFourComponent } from './erreurNavigation/four-oh-four/four-oh-four.component';
import { DemandeAbsenceComponent } from './absence/demande-absence/demande-absence.component';
import { JourFermeService } from './service/jour-ferme.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TechComponent,
    HeaderComponent,
    FooterComponent,
    CreationJourFerieComponent,
    ListerJourFerieComponent,
    AccesRefuseComponent,
    FourOhFourComponent,
    DemandeAbsenceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    JourFermeService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
