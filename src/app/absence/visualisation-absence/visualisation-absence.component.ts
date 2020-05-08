import { Component, OnInit } from '@angular/core';
import { VisualisationAbsenceService } from 'src/app/service/visualisation-absence.service';
import { Absence } from 'src/app/models/absence';
import { AuthService } from 'src/app/service/auth.service';
import { Collegue } from 'src/app/auth/auth.domains';
import { Solde } from 'src/app/models/solde';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-visualisation-absence',
  templateUrl: './visualisation-absence.component.html',
})
export class VisualisationAbsenceComponent implements OnInit {

  faPencil = faPencilAlt;
  faTrash = faTrash;
  listeAbsences: Absence[];
  listeSoldes: Solde[];
  collegue: Collegue;

  constructor(private absenceService: VisualisationAbsenceService,
              private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.collegueConnecteObs
      .subscribe(col => this.collegue = col,
        err => console.log('oops'));

    this.absenceService.listerAbsencesCollegue(this.collegue.email)
      .subscribe(absences => this.listeAbsences = absences,
        err => console.log('oops'));

    this.absenceService.listerSoldesCollegue(this.collegue.email)
    .subscribe(soldes => this.listeSoldes = soldes,
      err => console.log('oops'));

  }

}
