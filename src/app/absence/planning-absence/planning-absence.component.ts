import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AbsenceService } from 'src/app/service/absence.service';
import { AuthService } from 'src/app/service/auth.service';
import { Collegue } from 'src/app/auth/auth.domains';
import { Solde } from 'src/app/models/solde';
import { TypeSolde } from 'src/app/models/type-solde';
import { AbsenceVisualisation } from 'src/app/models/absence-visualisation';
import { Evenement } from 'src/app/models/Evenement';
import { Statut } from 'src/app/models/statut';
import {JourFermeService} from 'src/app/service/jour-ferme.service';
import { JourFermeVisualisation } from 'src/app/models/jour-ferme-visualisation';


@Component({
  selector: 'app-planning-absence',
  templateUrl: './planning-absence.component.html',
  styleUrls: ['./planning-absence.component.scss']
})
export class PlanningAbsenceComponent implements OnInit {

  calendarPlugins = [dayGridPlugin];
  locale: string = 'fr';
  listeSoldes: Solde[];
  soldeEnum = TypeSolde;
  collegue: Collegue;
  message: string;
  messageErreur = '';
  listeAbsences: AbsenceVisualisation[];
  events: Evenement[] = [];
  eventsFermes : Evenement[] = [];
  loadCalendar: boolean = false;
  statutEnum = Statut;
  listeJourFerme: JourFermeVisualisation[] = new Array();


  constructor(private absenceService: AbsenceService, private authService: AuthService, private jourFermeService :JourFermeService) { }

  ngOnInit(): void {

    //récupération du collegue connecté
    this.authService.collegueConnecteObs.subscribe(
      (col) => {
        this.collegue = col
      }, (error) => {
        this.messageErreur = error.error.message;
      }
    );
    // Afficher les absences
    this.absenceService.listerAbsencesCollegue().subscribe(
      (absences) => {
        this.listeAbsences = absences;
        this.listeAbsences.forEach(value => {
          if (value.statut == this.statutEnum.VALIDEE) {
            let date: Date;
            for (date = new Date(value.dateDebut); date <= new Date(value.dateFin); date.setDate(new Date(date).getDate() + 1)) {
              let event: Evenement = new Evenement(value.type, this.convertDate(date));
              this.events.push(event);
            }
          }
        });
        this.loadCalendar = true;
      }, (error) => {
        this.messageErreur = error.error.message;
      }
    );

    //Lister solde du collegue
    this.absenceService.listerSoldesCollegue().subscribe(
      (soldes) => {
        this.listeSoldes = soldes
      },
      (error) => {
        this.messageErreur = error.error.message;
      }
    );
  }
  convertDate(inputFormat: Date) {
    var d = new Date(inputFormat)
    return [d.getFullYear(), this.pad(d.getMonth() + 1), this.pad(d.getDate())].join('-')
  }

  pad(s: number) { return (s < 10) ? '0' + s : s; }

  /*// Lister les jours fermés
  this.jourFermeService.listerJourFermeParAnnee().subscribe(
    (listeJours) => {
      this.listeJourFerme = listeJours;
      this.listeJourFerme.forEach(data => {
          let date: Date;
          for (date = new Date(data.date); date <= new Date(value.dateFin); date.setDate(new Date(date).getDate() + 1)) {
            let eventFerme: Evenement = new Evenement(data.type, this.convertDate(date));
            this.eventsFerme.push(eventFerme);
          }
      });
      this.loadCalendar = true;
    }, (error) => {
      this.messageErreur = error.error.message;
    }
  );  */

}
