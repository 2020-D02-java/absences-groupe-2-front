import { Component, OnInit } from '@angular/core';
import { JourFermeService } from 'src/app/service/jour-ferme.service';
import { JourFerme } from 'src/app/models/jour-ferme';
import { Observable } from 'rxjs';
import { Collegue } from 'src/app/auth/auth.domains';
import { AuthService } from 'src/app/service/auth.service';
import { faTrash, faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Type } from '@angular/compiler';
import { TypeJourFerme } from 'src/app/models/type-jour-ferme';
import { ModificationJourFerieComponent } from '../modification-jour-ferie/modification-jour-ferie.component';

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
  yearSelect;

  // Message validation modale
  message: string;

  listYears: number[] = new Array();

  constructor(private jourFermeService: JourFermeService, private authSrv: AuthService, private modalService: NgbModal, private router: Router) { }

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
    this.yearSelect = date.getFullYear();
    date.setFullYear(date.getFullYear() + 10);

    for (let i = 0; i < 20; i++) {
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

  onUpdate(id: number) {
    this.router.navigate(['/modificationJourFerie']);
  }

  // [DEBUT] ***** GESTION DU MODAL DE SUPPRESSION ****** //

  onDelete(id: number) {
    console.log(id);
    this.message = 'SUPPRESSION CONFIRMEE ! REDIRECTION ... ';
    this.router.navigate(['/listerJourFerie']);
    this.jourFermeService.suppressionJourFerme(id).subscribe(
        data => this.refresh(data));
    }
  // [FIN] ***** GESTION DU MODAL DE SUPPRESSION ****** //

  open(content, id) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.onDelete(id);
    });
  }

  refresh(data) {
    this.jourFermeService.listerJourFermeParAnnee(new Date().getFullYear()).subscribe(
      (listeJours) => {
        this.listeJourFerme = listeJours;
      }, (error) => {
        console.log('Erreur ' + error);
      }
    )
  }



}
