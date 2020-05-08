import { Component, OnInit } from '@angular/core';
import { JourFermeService } from 'src/app/service/jour-ferme.service';
import { JourFerme } from 'src/app/models/jourferme';
import { Observable } from 'rxjs';
import { Collegue } from 'src/app/auth/auth.domains';
import { HeaderComponent } from '../../header/header.component';
import { AuthService } from 'src/app/service/auth.service';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lister-jour-ferie',
  templateUrl: './lister-jour-ferie.component.html',
  styleUrls: ['./lister-jour-ferie.component.scss']
})
export class ListerJourFerieComponent implements OnInit {

  faPencil = faPencilAlt;
  faTrash = faTrash;
  listeJourFerme: JourFerme[] = new Array();
  currentListJourFerme: JourFerme[] = new Array();
  utilisateurConnecte: Collegue;
  collegueConnecte: Observable<Collegue>;

  listYears: number[] = new Array();

  constructor(private jourFermeService: JourFermeService, private authSrv: AuthService) { }

  ngOnInit(): void {
    this.jourFermeService.listerJourFermeParAnnee(new Date().getFullYear()).subscribe(
      (listeJours) => { 
        this.listeJourFerme = listeJours;
      }, (error) => {
        console.log('Erreur '+error);
      }
    )
    this.getAllYear();

    this.collegueConnecte = this.authSrv.collegueConnecteObs;

    // On v�rifie si l'utilisateur est bien connect�
    this.authSrv.verifierAuthentification().subscribe(
      (etatConnexion) => { 
        this.utilisateurConnecte = etatConnexion;
      }, (error) => {
        console.log('Error , error, fuyez ! ' + error);
      }
    );
  }

  getDayToString(date: Date): string {
    var day: number = date.getMonth();

    switch(day) {

      case 1: {
        return "Lundi"
      }

      case 2: {
        return "Mardi"
      }

      case 3: {
        return "Mercredi"
      }

      case 4: {
        return "Jeudi"
      }

      case 5: {
        return "Vendredi"
      }

      case 6: {
        return "Samedi"
      }

      case 0: {
        return "Dimanche"
      }
    }
  }

  getAllYear() {
    let date: Date = new Date();

    for(let i = 0; i < 10; i++) {
      this.listYears.push(date.getFullYear());
      date.setFullYear(date.getFullYear() - 1);
    }
  }

  filterYear(year) {
    this.jourFermeService.listerJourFermeParAnnee(year).subscribe(
    (listeJours) => { 
      this.listeJourFerme = listeJours;
    }, (error) => {
      console.log('Erreur '+error);
    }
  )
  }

}
