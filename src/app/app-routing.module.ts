import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TechComponent } from './tech/tech.component';
import { AuthComponent } from './auth/auth.component';
import { ListerJourFermeComponent } from './jourFerme/lister-jour-ferme/lister-jour-ferme.component';
import { CreationJourFermeComponent } from './jourFerme/creation-jour-ferme/creation-jour-ferme.component';
import { StatutConnecteService } from './service/statut-connecte.service';
import { StatutAdministrateurService } from './service/statut-administrateur.service';
import { FourOhFourComponent } from './erreurNavigation/four-oh-four/four-oh-four.component';
import { AccesRefuseComponent } from './erreurNavigation/acces-refuse/acces-refuse.component';
import { DemandeAbsenceComponent } from './absence/demande-absence/demande-absence.component';
import { VisualisationAbsenceComponent } from './absence/visualisation-absence/visualisation-absence.component';
import { ModificationAbsenceComponent } from './absence/modification-absence/modification-absence.component';
import { ModificationJourFermeComponent } from './jourFerme/modification-jour-ferme/modification-jour-ferme.component';
import { VueSynthetiquesComponent } from './vue-synthetiques/vue-synthetiques.component';
import { StatutManagerService } from './service/statut-manager.service';
import { VueParDepartementParJourParCollaborteurComponent } from './vue-synthetiques/vue-par-departement-par-jour-par-collaborteur/vue-par-departement-par-jour-par-collaborteur.component';
import { HistogrammeParDepartementParJourComponent } from './vue-synthetiques/histogramme-par-departement-par-jour/histogramme-par-departement-par-jour.component';
import { ValidationDemandesComponent } from './validation-demandes/validation-demandes.component';
import { PlanningAbsenceComponent } from './absence/planning-absence/planning-absence.component';

const routes: Routes = [
  // canActivate: [StatutConnecteService] ==> Permet de verifier si l'utilisateur est connecte
  // canActivate: [StatutAdministrateurService] ==> Permet de verifier si l'utilisateur connecte est bien un administrateur
  // canActivate: [StatutManagerService] ==> Permet de verifier si l'utilisateur connecte est bien un manager
  // canActivate: [StatutEmployeService] ==> Permet de verifier si l'utilisateur connecte est bien un employe
  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService] }, //  tech accessible uniquement si connecte
  { path: 'auth', component: AuthComponent },
  { path: 'listerJourFerme', component: ListerJourFermeComponent, canActivate: [StatutConnecteService] },
  { path: 'creationJourFerme', component: CreationJourFermeComponent, canActivate: [StatutConnecteService, StatutAdministrateurService] },
  { path: 'accesRefuse', component: AccesRefuseComponent },
  { path: 'demandeAbsence', component: DemandeAbsenceComponent, canActivate: [StatutConnecteService] },
  { path: 'visualisationAbsence', component: VisualisationAbsenceComponent, canActivate: [StatutConnecteService] },
  { path: 'modificationAbsence/:id', component: ModificationAbsenceComponent, canActivate: [StatutConnecteService, StatutAdministrateurService] },
  { path: 'modificationJourFerme/:id', component: ModificationJourFermeComponent, canActivate: [StatutConnecteService, StatutAdministrateurService] },
  { path: 'planningAbsence', component: PlanningAbsenceComponent, canActivate: [StatutConnecteService] },
  { path: 'vueSynthetiques', component: VueSynthetiquesComponent, canActivate: [StatutConnecteService, StatutManagerService] },
  { path: 'vueParDepartementParJourParCollaborateur', component: VueParDepartementParJourParCollaborteurComponent, canActivate: [StatutConnecteService, StatutManagerService] },
  { path: 'histogrammeParDepartementParJour', component: HistogrammeParDepartementParJourComponent, canActivate: [StatutConnecteService, StatutManagerService] },
  { path: 'validationDemandes', component: ValidationDemandesComponent, canActivate: [StatutConnecteService, StatutManagerService] },

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
