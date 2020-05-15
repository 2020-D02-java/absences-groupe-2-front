import { Component, OnInit } from '@angular/core';
import { AbsenceVisualisation } from '../models/absence-visualisation';
import { DemandeAbsenceService } from '../service/demande-absence.service';

@Component({
  selector: 'app-validation-demandes',
  templateUrl: './validation-demandes.component.html',
  styleUrls: ['./validation-demandes.component.scss']
})
export class ValidationDemandesComponent implements OnInit {

  listAbsences: AbsenceVisualisation[] = new Array();

  constructor(private absenceService: DemandeAbsenceService) { }

  ngOnInit(): void {
    this.absenceService.getAbsencesparStatut().subscribe(
      (absences) => {
        this.listAbsences = absences;
      }, (error) => {
        console.log('Erreur ' + error);
      }
      )
  }

}
