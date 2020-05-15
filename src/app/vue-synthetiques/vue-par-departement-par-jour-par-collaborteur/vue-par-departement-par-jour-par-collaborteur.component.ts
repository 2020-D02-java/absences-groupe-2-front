import { Component, OnInit } from '@angular/core';
import { Collegue } from 'src/app/auth/auth.domains';
import { CollegueService } from 'src/app/service/collegue.service';
import { formatDate } from '@angular/common';
import { AbsenceVisualisationId } from 'src/app/models/absence-visualisation-id';
import { AbsenceService } from 'src/app/service/absence.service';

@Component({
  selector: 'app-vue-par-departement-par-jour-par-collaborteur',
  templateUrl: './vue-par-departement-par-jour-par-collaborteur.component.html',
  styleUrls: ['./vue-par-departement-par-jour-par-collaborteur.component.scss']
})
export class VueParDepartementParJourParCollaborteurComponent implements OnInit {

  // Selection en cours
  jourEnCours = new Date();
  anneeSelectionnee = this.jourEnCours.getFullYear();
  moisSelectionne = this.jourEnCours.getMonth();

  // Initialisations
  nombreJours: number[] = new Array();
  listeCollegues: Collegue[] = new Array();
  message: string;

  listeAbsences: AbsenceVisualisationId[] = new Array();

  // Année
  yearSelect: number;
  listeAnnees: number[] = new Array();

  // Mois
  monthSelect: number;
  listeMois = [
    {
      number: 0,
      correspondance: '01',
      nom: 'Janvier'
    }, {
      number: 1,
      correspondance: '02',
      nom: 'Fevrier'
    }, {
      number: 2,
      correspondance: '03',
      nom: 'Mars'
    }, {
      number: 3,
      correspondance: '04',
      nom: 'Avril'
    }, {
      number: 4,
      correspondance: '05',
      nom: 'Mai'
    }, {
      number: 5,
      correspondance: '06',
      nom: 'Juin'
    }, {
      number: 6,
      correspondance: '07',
      nom: 'Juillet'
    }, {
      number: 7,
      correspondance: '08',
      nom: 'Aout'
    }, {
      number: 8,
      correspondance: '09',
      nom: 'Septembre'
    }, {
      number: 9,
      correspondance: '10',
      nom: 'Octobre'
    }, {
      number: 10,
      correspondance: '11',
      nom: 'Novembre'
    }, {
      number: 11,
      correspondance: '12',
      nom: 'Decembre'
    }];

  dateAujourdhui = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US');


  // Tableau qu'on peuple de tous les jours du mois (NumeroJour, NomDuJour)
  tableauDeJours = new Array();


  // lesJours: jourNom[] = [];

  // Constructeur
  constructor(private collegueService: CollegueService, private absenceService: AbsenceService) { }

  ngOnInit(): void {

    // On récupère tous les collègues trouvés
    this.collegueService.listerCollegues().subscribe(
      (value) => {
        this.listeCollegues = value;
      }, (error) => {
        this.message = error.error.message;
      }
    );

    // On récupere toutes les absences trouvées
    this.absenceService.listerAbsencesToutesCollegue().subscribe(
      (absences) => {
        this.listeAbsences = absences;
      }, (error) => {
        this.message = error.error.message;
      }
    );

    // On initialise le select des années
    this.getAllYear();
    // On récupere la date du jour
    const now = new Date();
    // On initialise l'affichage du tableau au mois en cours.
    this.nombreJoursDansLeMois(now.getMonth(), now.getFullYear());
  }


  nombreJoursDansLeMois(mois, annee) {

    // On recréé le tableau, pour purger l'ancien , et afficher le nouveau avec les nouvelles données
    this.tableauDeJours = new Array();

    // Nombre de jours dans le mois en cours
    const nbJoursMois = new Date(annee, mois + 1, 0).getDate();

    // Afficher tous les jours du mois en cours
    for (let i = 1; i < nbJoursMois + 1; i++) {

      // Recréer toutes les dates du mois en cours, pour récupérer le jour (Lundi, Mardi, ...)
      const dateABoucler = new Date(`${annee}-${mois + 1}-${i}`);

      // Récupérer le nom du jour en cours (Lundi, Mardi, ...)
      const jourSaisie = formatDate(dateABoucler, 'E', 'en-US');

      let j;
      if (i <= 9) {
        j = '0' + i;
      } else {
        j = i;
      }
      // Ajouter au tableau [numeroJour, nomDuJour]
      this.tableauDeJours.push([j, jourSaisie]);
    }
  }

  // Afficher toutes les années, pour peupler le select
  getAllYear() {
    const date: Date = new Date();
    this.yearSelect = date.getFullYear();
    date.setFullYear(date.getFullYear() + 10);

    for (let i = 0; i < 20; i++) {
      this.listeAnnees.push(date.getFullYear());
      date.setFullYear(date.getFullYear() - 1);
    }
  }

  // Cas select par années
  filtrerParAnnee(annee) {
    this.anneeSelectionnee = annee;
    this.nombreJoursDansLeMois(this.moisSelectionne, annee);
  }

  // Cas select par mois
  filtrerParMois(mois) {
    this.moisSelectionne = mois;
    this.nombreJoursDansLeMois(mois, this.anneeSelectionnee);
  }

  filterCollegue(date) {
    for (let i; i < this.listeAbsences.length; i++) {
      if (date === this.listeAbsences[i].dateDebut) {
        this.message = 'c';
      } else {
        this.message = '-'
      }
    }
  }


}
