import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JourFermeService } from 'src/app/service/jour-ferme.service';

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
    private jourFermeService : JourFermeService) { }

  ngOnInit(): void {
    this.initialiserFormulaire();
  }

  initialiserFormulaire() {
    this.formCreationJourFerme = this.formBuilder.group({
      dateJourFerme: ['', Validators.required],
      typeJourFerme: ['', Validators.required],
      commentaireJourFerme: ['', Validators.required]
    });
  }
  validerFormulaire() {

    // R�cup�ration des donn�es du formulaire
    const dateJourFerme = this.formCreationJourFerme.get('dateJourFerme').value;
    const typeJourFerme = this.formCreationJourFerme.get('typeJourFerme').value;
    const commentaireJourFerme = this.formCreationJourFerme.get('commentaireJourFerme').value;

<<<<<<< HEAD
    // Mise � jour message de validation
    this.messageValidation = 'Fomulaire valid�';
=======
    // if (typeJourFerme < Date.now()) {
    //   console.log('Date dans le pass�, erreur');
    // }

    // Mise � jour message de validation
    this.messageValidation = 'Fomulaire valid�';
>>>>>>> master

    // Affichage des donn�es r�cup�r�es
    console.log(dateJourFerme + typeJourFerme + commentaireJourFerme);

    // Redirection vers la liste des jours feri�s en cas de r�ussite
    //this.router.navigate(['listerJourFerie']);

<<<<<<< HEAD

=======
>>>>>>> master
    this.jourFermeService.ajouterJourFerme(dateJourFerme, typeJourFerme, commentaireJourFerme).subscribe(
    () => { },
      (error) => {
        this.messageErreur = ' Oulah, il y a un probleme mec';
      }, () => {
<<<<<<< HEAD
        this.messageValidation = ' Formulaire valid� !';
=======
        this.messageValidation = 'Formulaire valid� !';
>>>>>>> master
        setTimeout(() => {
          this.router.navigate(['listerJourFerie']);
        }, 2000);
      }
    );
  }
}
