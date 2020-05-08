import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import { Collegue } from '../auth/auth.domains';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import 'rxjs/Rx';


import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  
  
  // Mise en place de l'observable pour r�cup�rer le role du coll�gue, pour l'affichage des onglets de navigation appropri�s
  collegueConnecte: Observable<Collegue>;
  utilisateurConnecte: Collegue;
  constructor(private authSrv: AuthService, private router: Router) { }

  //** timer debut */
  iconeStopWatch = faStopwatch;
  counterSubscription: Subscription;
  secondes: number = 0;
  //** timer fin */

  ngOnInit() {
    //** timer debut ** */
    const compteur = Observable.interval(1000);
    this.counterSubscription = compteur.subscribe(
      (valeur: number) => {
        this.secondes = valeur;
      }
    );
    //** timer fin ** */

    this.collegueConnecte = this.authSrv.collegueConnecteObs;

    // On v�rifie si l'utilisateur est bien connect�
    this.authSrv.verifierAuthentification().subscribe(
      (etatConnexion) => { this.utilisateurConnecte = etatConnexion;
      }, (error) => {
        console.log('Error , error, fuyez ! ' + error);
      }
    );
  }

  seDeconnecter() {
    this.authSrv.seDeconnecter().subscribe(
      () => this.router.navigate(['/auth'])
    );
  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }

}
