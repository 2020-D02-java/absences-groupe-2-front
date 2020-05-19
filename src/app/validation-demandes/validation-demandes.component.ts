import { Component, OnInit } from '@angular/core';
import { AbsenceVisualisation } from '../models/absence-visualisation';
import { DemandeAbsenceService } from '../service/demande-absence.service';
import { Statut } from '../models/statut';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../service/auth.service';
import { Collegue } from '../auth/auth.domains';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-validation-demandes',
  templateUrl: './validation-demandes.component.html',
  styleUrls: ['./validation-demandes.component.scss']
})
export class ValidationDemandesComponent implements OnInit {

  listAbsences: AbsenceVisualisation[] = new Array();

  collegueConnecte: Observable<Collegue>;

  faCheck = faCheck;
  faTimes = faTimes;

  messageValidation = '';
  messageErreur = '';

  constructor(private modalService: NgbModal, private absenceService: DemandeAbsenceService, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.absenceService.getAbsencesparStatut(Statut.EN_ATTENTE_VALIDATION).subscribe(
      (absences) => {
        this.listAbsences = absences;
      }, (error) => {
        console.log('Erreur ' + error);
      }
    )

    this.collegueConnecte = this.authSrv.collegueConnecteObs;
  }

  validerDemande(id: number) {
    this.absenceService.validerDemande(id).subscribe(
      (data) => {
        this.refresh(data);
      },
      (error) => {
        this.messageErreur = error.error.message;
      }
    )
  }

  refuserDemande(id: number) {
    this.absenceService.refuserDemande(id).subscribe(
      (data) => {
        this.refresh(data);
      },
      (error) => {
        this.messageErreur = error.error.message;
      }
    )
  }


  refresh(data) {
    this.absenceService.getAbsencesparStatut(Statut.EN_ATTENTE_VALIDATION).subscribe(
      (absences) => {
        this.listAbsences = absences;
      }, (error) => {
        console.log('Erreur ' + error);
      }
    )
  }

  // MODALE

  openSuppression(content, id) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.refuserDemande(id);
    });
  }
  openValidation(content, id) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.validerDemande(id);
    });
  }

}
