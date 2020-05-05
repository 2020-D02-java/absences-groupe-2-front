import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TechComponent} from './tech/tech.component';
import {StatutConnecteService} from './auth/statut-connecte.service';
import {AuthComponent} from './auth/auth.component';
import { ListerJourFerieComponent } from './jourFerie/lister-jour-ferie/lister-jour-ferie.component';
import { CreationJourFerieComponent } from './jourFerie/creation-jour-ferie/creation-jour-ferie.component';


const routes: Routes =  [
  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService]}, // /tech accessible uniquement si connecté
  { path: 'auth', component: AuthComponent},
  { path: 'listerJourFerie', component: ListerJourFerieComponent},
  { path: 'creationJourFerie', component: CreationJourFerieComponent},
  { path: '', redirectTo: '/tech', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
