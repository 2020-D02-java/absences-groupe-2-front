import { Component, OnInit } from '@angular/core';
import { JourFermeService } from 'src/app/service/jour-ferme.service';
import { JourFerme } from 'src/app/models/jour-ferme';
import { Observable } from 'rxjs';
import { Collegue } from 'src/app/auth/auth.domains';
import { AuthService } from 'src/app/service/auth.service';
import { faTrash, faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lister-jour-ferie',
  templateUrl: './lister-jour-ferie.component.html',
  styleUrls: ['./lister-jour-ferie.component.scss']
})
export class ListerJourFerieComponent implements OnInit {

  faPencil = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;
  listeJourFerme: JourFerme[] = new Array();
  currentListJourFerme: JourFerme[] = new Array();
  utilisateurConnecte: Collegue;
  collegueConnecte: Observable<Collegue>;

  listYears: number[] = new Array();

  constructor(private jourFermeService: JourFermeService, private authSrv: AuthService, private modalService: NgbModal) { }

  ngOnInit(): void {

    this.jourFermeService.listerJourFermeParAnnee(new Date().getFullYear()).subscribe(
      (listeJours) => {
        this.listeJourFerme = listeJours;
      }, (error) => {
        console.log('Erreur ' + error);
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

  getAllYear() {
    let date: Date = new Date();

    for (let i = 0; i < 10; i++) {
      this.listYears.push(date.getFullYear());
      date.setFullYear(date.getFullYear() - 1);
    }
  }

  filterYear(year) {
    this.jourFermeService.listerJourFermeParAnnee(year).subscribe(
      (listeJours) => {
        this.listeJourFerme = listeJours;
      }, (error) => {
        console.log('Erreur ' + error);
      }
    )
  }

  // [DEBUT] ***** GESTION DU MODAL DE SUPPRESSION ****** //

  open(content) {
    this.modalService.open(content).result.then((result) => {
      // Cas ou l'utilisateur valide, en appuyant sur "Je suis sur !"
      console.log('Utilisateur valide la suppression');
    }, () => {
      // Cas ou l'utilisateur annule, en appuyant sur la croix
      console.log('Utilisateur annule suppression');
    });
  }

  // [FIN] ***** GESTION DU MODAL DE SUPPRESSION ****** //


}
