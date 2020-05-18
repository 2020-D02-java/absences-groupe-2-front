import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Statut } from 'src/app/models/statut';
import { AbsenceVisualisation } from 'src/app/models/absence-visualisation';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AbsenceService } from 'src/app/service/absence.service';

@Component({
  selector: 'app-modification-absence',
  templateUrl: './modification-absence.component.html',
  styleUrls: ['./modification-absence.component.scss']
})
export class ModificationAbsenceComponent implements OnInit {

  // Icones
  faCheck = faCheck;
  faTimes = faTimes;

  // Initialisations
  formModificationAbsence: FormGroup;
  messageErreur = '';
  messageValidation = '';
  id: number;
  absence: AbsenceVisualisation;

  // Constructeur
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private routerLinkActive: ActivatedRoute,
    private AbsenceService: AbsenceService) { }

  ngOnInit(): void {
    // Snapshot pour r�cup�rer l'id pass� via l'url
    this.id = this.routerLinkActive.snapshot.params['id'];

    // Subscription � l'observable
    this.AbsenceService.getAbsenceParId(this.id).subscribe(
      (abs) => {
        this.absence = abs;
        this.initialiserFormulaire();
      }, (error) => {
        this.messageErreur = error.error.message;
      }
    )
  }

  initialiserFormulaire() {
    this.formModificationAbsence = this.formBuilder.group({
      dateDebut: [this.absence.dateDebut, Validators.required],
      dateFin: [this.absence.dateFin, Validators.required],
      typeAbsence: [this.absence.type, Validators.required],
      motifAbsence: [this.absence.motif]
    });
  }

  validerFormulaire() {

    // R�cup�ration des donn�es du formulaire
    const dateDebut = this.formModificationAbsence.get('dateDebut').value;
    const dateFin = this.formModificationAbsence.get('dateFin').value;
    const type = this.formModificationAbsence.get('typeAbsence').value;
    const motif = this.formModificationAbsence.get('motifAbsence').value;

    // on formate la date du jour au format 'yyyy-MM-dd'
    const dateAujourdhui = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US');

    // Verifier jour de la semaine date debut
    const jourSaisieDateDebut = formatDate(dateDebut, 'E', 'en-US');
    // Verifier jour de la semaine date fin
    const jourSaisieDateFin = formatDate(dateFin, 'E', 'en-US');

    // -- Gestion des erreurs --
    // 1. Cas jour saisi dans le passé ou aujourd'hui, erreur
    // 2. Cas DateFin < DateDebut
    // 2.0 En cas d'oubli de saisie de type d'absence
    // 2.1 Cas date d�but saisie le WE, erreur
    // 2.1 Cas date fin saisie le WE, erreur
    // 3. Cas congès sans solde, et motif manquant
    // 4. Impossible de saisir une demande qui chevauche une autre sauf si celle-ci est en statut REJETEE

    if (dateDebut <= dateAujourdhui) {
      this.messageErreur = 'ERREUR. UNE DEMANDE NE PEUT ETRE SAISIE SUR UNE DATE ANTERIEURE A AUJOURDHUI.';
    }
    else if (dateFin < dateDebut) {
      this.messageErreur = 'ERREUR. LA DATE DE FIN NE PEUT ETRE INFERIEURE A LA DATE DE DEBUT DE CONGES.';
    }
    else if (type === 'null') {
      this.messageErreur = 'IL EST NECESSAIRE DE SELECTIONNER UN TYPE D\'ABSENCE';
    }
    else if (jourSaisieDateDebut === 'Sat' || jourSaisieDateDebut === 'Sun') {
      this.messageErreur = 'ERREUR. LA DATE DE DEBUT NE PEUT PAS AVOIR LIEU DURANT LE WEEK-END.';
    }
    else if (jourSaisieDateFin === 'Sat' || jourSaisieDateFin === 'Sun') {
      this.messageErreur = 'ERREUR. LA DATE DE FIN NE PEUT PAS AVOIR LIEU DURANT LE WEEK-END.';
    }
    else if (type === 'CONGES_SANS_SOLDE' && motif === '') {
      this.messageErreur = 'ERREUR. LE MOTIF EST OBLIGATOIRE POUR UNE DEMANDE DE CONGES SANS SOLDE.';
    }
    else {
      this.AbsenceService.modifierAbsence(this.id, dateDebut, dateFin, type, motif, Statut.INITIALE).subscribe(
        () => { },
        (error) => {
          this.messageErreur = error.error.message;
        }, () => {
          this.messageValidation = 'FORMULAIRE VALIDE. REDIRECTION ...';
          this.messageErreur = '';
          setTimeout(() => {
            // Redirection au bout de 2 secondes
            this.router.navigate(['visualisationAbsence']);
          }, 2000);
        }
      );
    }
  }

}
