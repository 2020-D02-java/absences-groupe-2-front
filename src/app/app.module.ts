import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

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
import { VisualisationAbsenceComponent } from './absence/visualisation-absence/visualisation-absence.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VisualisationAbsenceService } from './service/visualisation-absence.service';


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
    DemandeAbsenceComponent,
    VisualisationAbsenceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [
    JourFermeService,
    VisualisationAbsenceService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },
  {provide: LOCALE_ID, useValue: "fr-CA" }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
