import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { JourFermeService } from 'src/app/service/jour-ferme.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { JourFerme } from 'src/app/models/jour-ferme';
import { TypeJourFerme } from 'src/app/models/type-jour-ferme';

@Component({
  selector: 'app-modification-jour-ferie',
  templateUrl: './modification-jour-ferie.component.html',
  styleUrls: ['./modification-jour-ferie.component.scss']
})
export class ModificationJourFerieComponent implements OnInit {

  formCreationJourFerme: FormGroup;
  messageErreur = '';
  messageValidation = '';
  id: number;
  jourFerme: JourFerme;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private jourFermeService: JourFermeService,
    private routerLinkActive: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.routerLinkActive.snapshot.params['id'];
    

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
    this.formCreationJourFerme = this.formBuilder.group({
      dateJourFerme: [this.jourFerme.date, Validators.required],
      typeJourFerme: [this.jourFerme.type, Validators.required],
      commentaireJourFerme: [this.jourFerme.commentaire]
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
      this.jourFermeService.modifierJourFerme(this.id, dateJourFerme, typeJourFerme, commentaireJourFerme).subscribe(
        () => { },
        () => {
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
