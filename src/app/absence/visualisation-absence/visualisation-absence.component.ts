import { Component, OnInit } from '@angular/core';
import { VisualisationAbsenceService } from 'src/app/service/visualisation-absence.service';
import { Absence } from 'src/app/models/absence';
import { AuthService } from 'src/app/service/auth.service';
import { Collegue } from 'src/app/auth/auth.domains';

@Component({
  selector: 'app-visualisation-absence',
  templateUrl: './visualisation-absence.component.html',
})
export class VisualisationAbsenceComponent implements OnInit {

  listeAbs: Absence[];

  collegue: Collegue;

  constructor(private absenceService: VisualisationAbsenceService,
              private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.collegueConnecteObs
      .subscribe(col => this.collegue = col,
        err => console.log('oops'));

    this.absenceService.listerAbsenceCollegue(this.collegue.email)
      .subscribe(listeAbsences => this.listeAbs = listeAbsences,
        err => console.log('oops'));
  }

}
