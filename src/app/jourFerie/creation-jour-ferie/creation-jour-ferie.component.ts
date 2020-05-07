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

    // Rï¿½cupï¿½ration des donnï¿½es du formulaire
    const dateJourFerme = this.formCreationJourFerme.get('dateJourFerme').value;
    const typeJourFerme = this.formCreationJourFerme.get('typeJourFerme').value;
    const commentaireJourFerme = this.formCreationJourFerme.get('commentaireJourFerme').value;

<<<<<<< HEAD
    // Mise ï¿½ jour message de validation
    this.messageValidation = 'Fomulaire validï¿½';
=======
    // if (typeJourFerme < Date.now()) {
    //   console.log('Date dans le passé, erreur');
    // }

    // Mise à jour message de validation
    this.messageValidation = 'Fomulaire validé';
>>>>>>> master

    // Affichage des donnï¿½es rï¿½cupï¿½rï¿½es
    console.log(dateJourFerme + typeJourFerme + commentaireJourFerme);

    // Redirection vers la liste des jours feriï¿½s en cas de rï¿½ussite
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
        this.messageValidation = ' Formulaire validï¿½ !';
=======
        this.messageValidation = 'Formulaire validé !';
>>>>>>> master
        setTimeout(() => {
          this.router.navigate(['listerJourFerie']);
        }, 2000);
      }
    );
  }
}
