import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JourFermeService } from 'src/app/service/jour-ferme.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-creation-jour-ferie',
  templateUrl: './creation-jour-ferie.component.html',
  styleUrls: ['./creation-jour-ferie.component.scss']
})
export class CreationJourFerieComponent implements OnInit {

  formCreationJourFerme: FormGroup;
  messageErreur = '';
  messageValidation = '';
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private jourFermeService: JourFermeService) { }

  ngOnInit(): void {
    this.initialiserFormulaire();
  }

  initialiserFormulaire() {
    this.formCreationJourFerme = this.formBuilder.group({
      dateJourFerme: ['', Validators.required],
      typeJourFerme: ['', Validators.required],
      commentaireJourFerme: ['']
    });
  }
  validerFormulaire() {

    // R�cup�ration des donn�es du formulaire
    const dateJourFerme = this.formCreationJourFerme.get('dateJourFerme').value;
    const typeJourFerme = this.formCreationJourFerme.get('typeJourFerme').value;
    const commentaireJourFerme = this.formCreationJourFerme.get('commentaireJourFerme').value;

    // on formate la date du jour au format 'yyyy-MM-dd'
    const dateAujourdhui = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US');

    // Verifier jour de la semaine
    const jourSaisie = formatDate(dateJourFerme, 'E', 'en-US');

    // V�rification du jour saisi
    // Cas 1 , jour saisi est dans le pass�, erreur
    // Cas 2 , saisie RTT le WE, erreur
    // Cas 3 , cas JOUR FERIE et commentaire manquant
    // Cas 4 , jour saisi est dans le futur, ok

    if (dateJourFerme < dateAujourdhui)
    {
      this.messageErreur = 'ERREUR. SAISIE DANS LE PASSE IMPOSSIBLE.';
    }
    else if (typeJourFerme === 'RTT_EMPLOYEUR' && (jourSaisie === 'Sat' || jourSaisie === 'Sun'))
    {
      this.messageErreur = 'ERREUR. IMPOSSIBLE DE SAISIE UN RTT LE WEEK-END.';
    }
    else if (typeJourFerme === 'JOURS_FERIES' && commentaireJourFerme === '') 
    {
      this.messageErreur = 'ERREUR. LE COMMENTAIRE EST OBLIGATOIRE POUR LES JOURS FERIES.';
    }
    else
    {
      this.jourFermeService.ajouterJourFerme(dateJourFerme, typeJourFerme, commentaireJourFerme).subscribe(
        () => { },
        (error) => {
          this.messageErreur = 'ERREUR';
        }, () => {
          this.messageValidation = 'FORMULAIRE VALIDE !';
          this.messageErreur = '';
          setTimeout(() => {
            // Redirection au bout de 2 secondes
            this.router.navigate(['listerJourFerie']);
          }, 2000);
        }
      );
    }


  }
}