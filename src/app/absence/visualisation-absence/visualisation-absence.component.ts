import { Component, OnInit } from '@angular/core';
import { VisualisationAbsenceService } from 'src/app/service/visualisation-absence.service';
import { AbsenceVisualisation } from 'src/app/models/absence-visualisation';
import { AuthService } from 'src/app/service/auth.service';
import { Collegue } from 'src/app/auth/auth.domains';
import { Solde } from 'src/app/models/solde';
import { faPencilAlt, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Statut } from 'src/app/models/statut';
import { Role } from 'src/app/models/role';
import { TypeSolde } from 'src/app/models/type-solde';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-visualisation-absence',
  templateUrl: './visualisation-absence.component.html',
})
export class VisualisationAbsenceComponent implements OnInit {

  // Enumerations
  statutEnum = Statut;
  roleEnum = Role;
  soldeEnum = TypeSolde;

  // Icones
  faPencil = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;

  // Initialisations
  listeAbsences: AbsenceVisualisation[];
  listeSoldes: Solde[];
  collegue: Collegue;
  message: string;

  constructor(private absenceService: VisualisationAbsenceService, private authService: AuthService, private modalService: NgbModal,
    private router: Router) { }

  ngOnInit(): void {

    this.authService.collegueConnecteObs
      .subscribe(col => this.collegue = col,
        err => console.log('oops'));

    this.absenceService.listerAbsencesCollegue()
      .subscribe(absences => this.listeAbsences = absences,
        err => console.log('oops'));

    this.absenceService.listerSoldesCollegue()
      .subscribe(soldes => this.listeSoldes = soldes,
        err => console.log('oops'));

  }


  // [DEBUT] ***** GESTION DU MODAL DE SUPPRESSION ****** //

  onDelete(id: number) {
    this.absenceService.suppressionAbsence(id).subscribe(
      data => this.refresh(data));
  }
  // [FIN] ***** GESTION DU MODAL DE SUPPRESSION ****** //

  open(content, id) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.onDelete(id);
    });
  }

  refresh(data) {
    this.absenceService.listerAbsencesCollegue()
      .subscribe(absences => this.listeAbsences = absences,
        err => console.log('oops'));

    this.absenceService.listerSoldesCollegue()
      .subscribe(soldes => this.listeSoldes = soldes,
        err => console.log('oops'));
  }

}
