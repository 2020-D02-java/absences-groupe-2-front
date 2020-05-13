import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Collegue } from '../auth/auth.domains';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  // Initialisation
  collegue: Collegue;

  // Constructeur
  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.collegueConnecteObs
      .subscribe(col => this.collegue = col,
        err => console.log('oops'));
  }

}
