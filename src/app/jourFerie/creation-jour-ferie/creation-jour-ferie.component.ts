import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creation-jour-ferie',
  templateUrl: './creation-jour-ferie.component.html',
  styleUrls: ['./creation-jour-ferie.component.scss']
})
export class CreationJourFerieComponent implements OnInit {

  formCreationJourFerie: FormGroup;
  messageErreur = '';
  messageValidation = '';
  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initialiserFormulaire();
  }

  initialiserFormulaire() {
    this.formCreationJourFerie = this.formBuilder.group({
      dateJourFerie: ['', Validators.required],
      typeJourFerie: ['', Validators.required],
      commentaireJourFerie: ['', Validators.required]
    });
  }
  validerFormulaire() {

    // R�cup�ration des donn�es du formulaire
    const dateJourFerie = this.formCreationJourFerie.get('dateJourFerie').value;
    const typeJourFerie = this.formCreationJourFerie.get('typeJourFerie').value;
    const commentaireJourFerie = this.formCreationJourFerie.get('commentaireJourFerie').value;

    // Mise � jour message de validation
    this.messageValidation = 'Fomulaire valid�';

    // Affichage des donn�es r�cup�r�es
    console.log(dateJourFerie + typeJourFerie + commentaireJourFerie);

    // Redirection vers la liste des jours feri�s en cas de r�ussite
    //this.router.navigate(['listerJourFerie']);

    /*
    A FAIRE --- REMPLACER CODE DU DESSUS POUR ACCES API --

    this.leService.leFonction(dateJourFerie, typeJourFerie, commentaireJourFerie).subscribe(
    () => { },
      (error) => {
        this.messageErreur = ' Oulah, il y a un probleme mec';
      }, () => {
        this.messageValidation = ' Formulaire valid� !';
        setTimeout(() => {
          window.location.reload();
          this.router.navigate(['listerJourFerie']);
        }, 2000);
      }
    );
    */
  }
}
