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
  constructor(private router: Router, private formBuilder: FormBuilder, private jourFermeService : JourFermeService) { }

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

    // Mise � jour message de validation
    this.messageValidation = 'Fomulaire valid�';

    // Affichage des donn�es r�cup�r�es
    console.log(dateJourFerme + typeJourFerme + commentaireJourFerme);

    // Redirection vers la liste des jours feri�s en cas de r�ussite
    //this.router.navigate(['listerJourFerie']);


    this.jourFermeService.ajouterJourFerme(dateJourFerme, typeJourFerme, commentaireJourFerme).subscribe(
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
  }
}
