import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Collegue } from '../auth/auth.domains';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // Mise en place de l'observable pour r�cup�rer le role du coll�gue, pour l'affichage des onglets de navigation appropri�s
  collegueConnecte: Observable<Collegue>;
  utilisateurConnecte: Collegue;
  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
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

}
