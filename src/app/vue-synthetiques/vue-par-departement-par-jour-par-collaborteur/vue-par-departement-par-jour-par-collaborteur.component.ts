import { Component, OnInit } from '@angular/core';
import { Collegue } from 'src/app/auth/auth.domains';
import { CollegueService } from 'src/app/service/collegue.service';

@Component({
  selector: 'app-vue-par-departement-par-jour-par-collaborteur',
  templateUrl: './vue-par-departement-par-jour-par-collaborteur.component.html',
  styleUrls: ['./vue-par-departement-par-jour-par-collaborteur.component.scss']
})
export class VueParDepartementParJourParCollaborteurComponent implements OnInit {

  listeCollegues: Collegue[] = new Array();
  message: string;
  constructor(private collegueService: CollegueService) { }

  ngOnInit(): void {
    this.collegueService.listerCollegues().subscribe(
      (value) => {
        this.listeCollegues = value;
      }, (error) => {
        this.message = error;
      }
    )
  }

}
