import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TechComponent} from './tech/tech.component';
import {AuthComponent} from './auth/auth.component';
import { ListerJourFerieComponent } from './jourFerie/lister-jour-ferie/lister-jour-ferie.component';
import { CreationJourFerieComponent } from './jourFerie/creation-jour-ferie/creation-jour-ferie.component';
import { StatutConnecteService } from './service/statut-connecte.service';
import { StatutAdministrateurService } from './service/statut-administrateur.service';
import { FourOhFourComponent } from './erreurNavigation/four-oh-four/four-oh-four.component';
import { AccesRefuseComponent } from './erreurNavigation/acces-refuse/acces-refuse.component';
import { DemandeAbsenceComponent} from './absence/demande-absence/demande-absence.component';

const routes: Routes =  [
  // canActivate: [StatutConnecteService] ==> Permet de v�rifier si l'utilisateur est connect�
  // canActivate: [StatutAdministrateurService] ==> Permet de v�rifier si l'utilisateur connect� est bien un administrateur
  // canActivate: [StatutManagerService] ==> Permet de v�rifier si l'utilisateur connect� est bien un manager
  // canActivate: [StatutEmployeService] ==> Permet de v�rifier si l'utilisateur connect� est bien un employe
  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService]}, //  tech accessible uniquement si connect�
  { path: 'auth', component: AuthComponent},
  { path: 'listerJourFerie', component: ListerJourFerieComponent,  canActivate: [StatutConnecteService]},
  { path: 'creationJourFerie', component: CreationJourFerieComponent,  canActivate: [StatutConnecteService, StatutAdministrateurService]},
  { path: 'accesRefuse', component: AccesRefuseComponent},
  { path: 'demandeAbsence', component: DemandeAbsenceComponent},

  { path: '', redirectTo: '/tech', pathMatch: 'full'},
  // Cas url inexistant
  { path: 'not-found', component: FourOhFourComponent},
  // Bien faire attention de laisser ce path en fin de liste, mettre les votres avant.
  { path: '**', redirectTo: '/not-found'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
