import { Component, OnInit } from '@angular/core';
import { JourFermeService } from 'src/app/service/jour-ferme.service';
import { JourFerme } from 'src/app/models/jour-ferme';


@Component({
  selector: 'app-lister-jour-ferie',
  templateUrl: './lister-jour-ferie.component.html',
  styleUrls: ['./lister-jour-ferie.component.scss']
})
export class ListerJourFerieComponent implements OnInit {

  listeJourFerme: JourFerme[];
  constructor(private jourFermeService: JourFermeService) { }

  ngOnInit(): void {
    this.jourFermeService.listerJourFerme().subscribe(
      (listeJours) => {
        this.listeJourFerme = listeJours;
      }, (error) => {
        console.log('Erreur '+ error);
      }
    )
  }

}
