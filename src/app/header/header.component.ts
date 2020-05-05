import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {Router} from '@angular/router';
import { Collegue } from '../auth/auth.domains';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // Mise en place de l'observable pour r�cup�rer le role du coll�gue, pour l'affichage des onglets de navigation appropri�s
  collegueConnecte: Observable<Collegue>;
  //collegueConnecte: Collegue;



  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;
    // this.authSrv.collegueConnecteObs.subscribe(
    //   (value) => {
    //     this.collegueConnecte = value;
    //   }, (error) => {
    //     console.log(error);
    //   }
    // );
    
  }

  seDeconnecter() {
    this.authSrv.seDeconnecter().subscribe(
      () => this.router.navigate(['/auth'])
    );
  }

}
