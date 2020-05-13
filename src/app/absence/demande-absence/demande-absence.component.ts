import { Component, OnInit } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DemandeAbsenceService } from 'src/app/service/demande-absence.service';
import { Statut } from 'src/app/models/statut';



@Component({
  selector: 'app-demande-absence',
  templateUrl: './demande-absence.component.html',
  styleUrls: ['./demande-absence.component.scss']
})
export class DemandeAbsenceComponent implements OnInit {
 
  faCheck = faCheck;
  faTimes = faTimes;
  formDemandeAbsence: FormGroup;
  messageErreur = '';
  messageValidation = '';
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private demandeAbsenceService: DemandeAbsenceService) { }

  ngOnInit(): void {
    this.initialiserFormulaire();
  }

  initialiserFormulaire() {
    this.formDemandeAbsence = this.formBuilder.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      typeAbsence: ['', Validators.required],
      motifAbsence: ['']
    });
  }
  validerFormulaire() {

    // R�cup�ration des donn�es du formulaire
    const dateDebut = this.formDemandeAbsence.get('dateDebut').value;
    const dateFin = this.formDemandeAbsence.get('dateFin').value;
    const type = this.formDemandeAbsence.get('typeAbsence').value;
    const motif = this.formDemandeAbsence.get('motifAbsence').value;

    // on formate la date du jour au format 'yyyy-MM-dd'
    const dateAujourdhui = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US');

    // -- Gestion des erreurs --
    // 1. Cas jour saisi dans le passé ou aujourd'hui, erreur
    // 2. Cas DateFin < DateDebut
    // 3. Cas congès sans solde, et motif manquant
    // 4. Impossible de saisir une demande qui chevauche une autre sauf si celle-ci est en statut REJETEE

    if (dateDebut <= dateAujourdhui)
    {
      this.messageErreur = 'ERREUR. UNE DEMANDE NE PEUT ETRE SAISIE SUR UNE DATE ANTERIEURE A AUJOURDHUI.';
    }
    else if (dateFin < dateDebut)
    {
      this.messageErreur = 'ERREUR. LA DATE DE FIN NE PEUT ETRE INFERIEURE A LA DATE DE DEBUT DE CONGES.';
    }
    else if (type === 'CONGES_SANS_SOLDE' && motif === '')
    {
      this.messageErreur = 'ERREUR. LE MOTIF EST OBLIGATOIRE POUR UNE DEMANDE DE CONGES SANS SOLDE.';
    }  
    else

    {
      console.log(dateDebut, dateFin, motif, type);
      this.demandeAbsenceService.ajouterAbsence(dateDebut, dateFin, type, motif, Statut.INITIALE).subscribe(
        () => { },
        () => {
          this.messageErreur = 'ERREUR';
        }, () => {
          this.messageValidation = 'FORMULAIRE VALIDE !';
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

