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

  // Mise en place de l'observable pour récupérer le role du collègue, pour l'affichage des onglets de navigation appropriés
  collegueConnecte: Observable<Collegue>;
  utilisateurConnecte: Collegue;
  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;

    // On vérifie si l'utilisateur est bien connecté
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
