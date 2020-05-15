import { Component, OnInit } from '@angular/core';
import { AbsenceVisualisation } from '../models/absence-visualisation';
import { DemandeAbsenceService } from '../service/demande-absence.service';
import { Statut } from '../models/statut';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-validation-demandes',
  templateUrl: './validation-demandes.component.html',
  styleUrls: ['./validation-demandes.component.scss']
})
export class ValidationDemandesComponent implements OnInit {

  listAbsences: AbsenceVisualisation[] = new Array();

  faCheck = faCheck;
  faTimes = faTimes;

  messageValidation = '';
  messageErreur = '';

  constructor(private absenceService: DemandeAbsenceService) { }

  ngOnInit(): void {
    this.absenceService.getAbsencesparStatut(Statut.EN_ATTENTE_VALIDATION).subscribe(
      (absences) => {
        this.listAbsences = absences;
      }, (error) => {
        console.log('Erreur ' + error);
      }
      )
  }

  validerDemande(id: number) {
    this.absenceService.validerDemande(id).subscribe(
      () => { 
        window.location.reload();
      },
      (error) => {
        this.messageErreur = error.error.message;
      }
    )
  }

  refuserDemande() {

  }

}
