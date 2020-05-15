import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TechComponent } from './tech/tech.component';
import { AuthComponent } from './auth/auth.component';
import { ListerJourFerieComponent } from './jourFerie/lister-jour-ferie/lister-jour-ferie.component';
import { CreationJourFerieComponent } from './jourFerie/creation-jour-ferie/creation-jour-ferie.component';
import { StatutConnecteService } from './service/statut-connecte.service';
import { StatutAdministrateurService } from './service/statut-administrateur.service';
import { FourOhFourComponent } from './erreurNavigation/four-oh-four/four-oh-four.component';
import { AccesRefuseComponent } from './erreurNavigation/acces-refuse/acces-refuse.component';
import { DemandeAbsenceComponent } from './absence/demande-absence/demande-absence.component';
import { VisualisationAbsenceComponent } from './absence/visualisation-absence/visualisation-absence.component';
import { ModificationAbsenceComponent } from './absence/modification-absence/modification-absence.component';
import { ModificationJourFerieComponent } from './jourFerie/modification-jour-ferie/modification-jour-ferie.component';
import { VueSynthetiquesComponent } from './vue-synthetiques/vue-synthetiques.component';
import { StatutManagerService } from './service/statut-manager.service';
import { VueParDepartementParJourParCollaborteurComponent } from './vue-synthetiques/vue-par-departement-par-jour-par-collaborteur/vue-par-departement-par-jour-par-collaborteur.component';
import { HistogrammeParDepartementParJourComponent } from './vue-synthetiques/histogramme-par-departement-par-jour/histogramme-par-departement-par-jour.component';
import { ValidationDemandesComponent } from './validation-demandes/validation-demandes.component';

const routes: Routes = [
  // canActivate: [StatutConnecteService] ==> Permet de v�rifier si l'utilisateur est connect�
  // canActivate: [StatutAdministrateurService] ==> Permet de v�rifier si l'utilisateur connect� est bien un administrateur
  // canActivate: [StatutManagerService] ==> Permet de v�rifier si l'utilisateur connect� est bien un manager
  // canActivate: [StatutEmployeService] ==> Permet de v�rifier si l'utilisateur connect� est bien un employe
  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService]}, //  tech accessible uniquement si connect�
  { path: 'auth', component: AuthComponent},
  { path: 'listerJourFerie', component: ListerJourFerieComponent,  canActivate: [StatutConnecteService]},
  { path: 'creationJourFerie', component: CreationJourFerieComponent,  canActivate: [StatutConnecteService, StatutAdministrateurService]},
  { path: 'accesRefuse', component: AccesRefuseComponent},
  { path: 'demandeAbsence', component: DemandeAbsenceComponent,  canActivate: [StatutConnecteService]},
  { path: 'visualisationAbsence', component: VisualisationAbsenceComponent, canActivate: [StatutConnecteService]},
  { path: 'modificationAbsence', component: ModificationAbsenceComponent, canActivate: [StatutConnecteService]},
  { path: 'modificationJourFerie/:id', component: ModificationJourFerieComponent, canActivate: [StatutConnecteService]},
  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService] }, //  tech accessible uniquement si connect�
  { path: 'auth', component: AuthComponent },
  { path: 'listerJourFerie', component: ListerJourFerieComponent, canActivate: [StatutConnecteService] },
  { path: 'creationJourFerie', component: CreationJourFerieComponent, canActivate: [StatutConnecteService, StatutAdministrateurService] },
  { path: 'accesRefuse', component: AccesRefuseComponent },
  { path: 'demandeAbsence', component: DemandeAbsenceComponent, canActivate: [StatutConnecteService] },
  { path: 'visualisationAbsence', component: VisualisationAbsenceComponent, canActivate: [StatutConnecteService] },
  { path: 'modificationAbsence', component: ModificationAbsenceComponent, canActivate: [StatutConnecteService] },
  { path: 'vueSynthetiques', component: VueSynthetiquesComponent, canActivate: [StatutConnecteService, StatutManagerService] },
  { path: 'vueParDepartementParJourParCollaborateur', component: VueParDepartementParJourParCollaborteurComponent, canActivate: [StatutConnecteService, StatutManagerService] },
  { path: 'histogrammeParDepartementParJour', component: HistogrammeParDepartementParJourComponent, canActivate: [StatutConnecteService, StatutManagerService] },
  { path: 'validationDemandesComponent', component: ValidationDemandesComponent, canActivate: [StatutConnecteService, StatutManagerService] },

  { path: '', redirectTo: '/tech', pathMatch: 'full' },
  // Cas url inexistant
  { path: 'not-found', component: FourOhFourComponent },
  // Bien faire attention de laisser ce path en fin de liste, mettre les votres avant.
  { path: '**', redirectTo: '/not-found' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
