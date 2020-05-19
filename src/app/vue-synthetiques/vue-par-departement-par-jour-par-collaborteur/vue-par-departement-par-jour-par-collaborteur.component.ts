import { Component, OnInit } from '@angular/core';
import { Collegue } from 'src/app/auth/auth.domains';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CollegueService } from 'src/app/service/collegue.service';
import { formatDate } from '@angular/common';
import { AbsenceService } from 'src/app/service/absence.service';
import { AbsenceVisualisationEmail } from 'src/app/models/absence-visualisation-email';

@Component({
  selector: 'app-vue-par-departement-par-jour-par-collaborteur',
  templateUrl: './vue-par-departement-par-jour-par-collaborteur.component.html',
  styleUrls: ['./vue-par-departement-par-jour-par-collaborteur.component.scss']
})
export class VueParDepartementParJourParCollaborteurComponent implements OnInit {

  // Icones
  faTimes = faTimes;

  // Selection en cours
  jourEnCours = new Date();
  anneeSelectionnee = this.jourEnCours.getFullYear();
  moisSelectionne = this.jourEnCours.getMonth();

  // Initialisations
  nombreJours: number[] = new Array();
  listeCollegues: Collegue[] = new Array();
  message: string;

  listeAbsences: AbsenceVisualisationEmail[] = new Array();

  // Année
  yearSelect: number;
  moisSelect: number;
  listeAnnees: number[] = new Array();

  // Mois
  monthSelect: number;
  listeMois = [
    {
      number: 0,
      nom: '-- Choisir --'
    }, {
      number: 1,
      nom: 'Janvier'
    }, {
      number: 2,
      nom: 'Fevrier'
    }, {
      number: 3,
      nom: 'Mars'
    }, {
      number: 4,
      nom: 'Avril'
    }, {
      number: 5,
      nom: 'Mai'
    }, {
      number: 6,
      nom: 'Juin'
    }, {
      number: 7,
      nom: 'Juillet'
    }, {
      number: 8,
      nom: 'Aout'
    }, {
      number: 9,
      nom: 'Septembre'
    }, {
      number: 10,
      nom: 'Octobre'
    }, {
      number: 11,
      nom: 'Novembre'
    }, {
      number: 12,
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
    let moisPlusUn = now.getMonth() + 1;
    console.log(moisPlusUn);
    // On initialise l'affichage du tableau au mois en cours.
    this.nombreJoursDansLeMois(moisPlusUn, now.getFullYear());
  }


  nombreJoursDansLeMois(mois, annee) {

    // On recréé le tableau, pour purger l'ancien , et afficher le nouveau avec les nouvelles données
    this.tableauDeJours = new Array();

    // Nombre de jours dans le mois en cours
    const nbJoursMois = new Date(annee, mois, 0).getDate();

    // Afficher tous les jours du mois en cours
    for (let i = 1; i < nbJoursMois + 1; i++) {

      // Recréer toutes les dates du mois en cours, pour récupérer le jour (Lundi, Mardi, ...)
      const dateABoucler = new Date(`${annee}-${mois}-${i}`);

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
    let j;
    if (mois <= 9) {
      j = '0' + mois;
    } else {
      j = mois;
    }
    this.moisSelectionne = j;
    this.nombreJoursDansLeMois(mois, this.anneeSelectionnee);
  }



}
