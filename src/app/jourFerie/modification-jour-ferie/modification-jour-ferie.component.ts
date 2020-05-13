import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JourFermeService } from 'src/app/service/jour-ferme.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { JourFermeVisualisation } from 'src/app/models/jour-ferme-visualisation';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modification-jour-ferie',
  templateUrl: './modification-jour-ferie.component.html',
  styleUrls: ['./modification-jour-ferie.component.scss']
})
export class ModificationJourFerieComponent implements OnInit {

  // Icones
  faCheck = faCheck;
  faTimes = faTimes;

  // Initialisations
  formModificationJourFerme: FormGroup;
  messageErreur = '';
  messageValidation = '';
  id: number;
  jourFerme: JourFermeVisualisation;

  // Constructeur
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private jourFermeService: JourFermeService,
    private routerLinkActive: ActivatedRoute) { }

  ngOnInit(): void {
    // Snapshot pour r�cup�rer l'id pass� via l'url
    this.id = this.routerLinkActive.snapshot.params['id'];

    // Subscription � l'observable
    this.jourFermeService.getJourFermeParId(this.id).subscribe(
      (jour) => {
        this.jourFerme = jour;
        this.initialiserFormulaire();
      }, (error) => {
        console.log('Erreur ' + error);
      }
    )

  }

  initialiserFormulaire() {
    this.formModificationJourFerme = this.formBuilder.group({
      dateJourFerme: [this.jourFerme.date, Validators.required],
      typeJourFerme: [this.jourFerme.type, Validators.required],
      commentaireJourFerme: [this.jourFerme.commentaire]
    });
  }

  validerFormulaire() {

    // R�cup�ration des donn�es du formulaire
    const dateJourFerme = this.formModificationJourFerme.get('dateJourFerme').value;
    const typeJourFerme = this.formModificationJourFerme.get('typeJourFerme').value;
    const commentaireJourFerme = this.formModificationJourFerme.get('commentaireJourFerme').value;

    // on formate la date du jour au format 'yyyy-MM-dd'
    const dateAujourdhui = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US');

    // Verifier jour de la semaine
    const jourSaisie = formatDate(dateJourFerme, 'E', 'en-US');

    // V�rification du jour saisi
    // Cas 1 , jour saisi est dans le pass�, erreur
    // Cas 2 , saisie RTT le WE, erreur
    // Cas 3 , cas JOUR FERIE et commentaire manquant
    // Cas 4 , jour saisi est dans le futur, ok

    if (dateJourFerme < dateAujourdhui) {
      this.messageErreur = 'ERREUR. SAISIE DANS LE PASSE IMPOSSIBLE.';
    }
    else if (typeJourFerme === 'RTT_EMPLOYEUR' && (jourSaisie === 'Sat' || jourSaisie === 'Sun')) {
      this.messageErreur = 'ERREUR. IMPOSSIBLE DE SAISIE UN RTT LE WEEK-END.';
    }
    else if (typeJourFerme === 'JOURS_FERIES' && commentaireJourFerme === '') {
      this.messageErreur = 'ERREUR. LE COMMENTAIRE EST OBLIGATOIRE POUR LES JOURS FERIES.';
    }
    else {
      this.jourFermeService.modifierJourFerme(this.id, dateJourFerme, typeJourFerme, commentaireJourFerme).subscribe(
        () => { },
        () => {
          this.messageErreur = 'ERREUR';
        }, () => {
          this.messageValidation = 'FORMULAIRE VALIDE. REDIRECTION ...';
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
