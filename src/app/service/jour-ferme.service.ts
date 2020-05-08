import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { JourFerme } from '../models/jour-ferme';
import { TypeJourFerme } from '../models/type-jour-ferme';

@Injectable({
  providedIn: 'root'
})
export class JourFermeService {

  // // Le subject est priv�, on le rend "public" avec "abonnementCollegueEnCours()"
  // private jourFermeSubject = new Subject<JourFerme>();

  constructor(private http: HttpClient) { }

  listerJourFerme() {
    return this.http.get<JourFerme[]>(`http://localhost:8080/jourFerme`);
  }

  listerJourFermeParAnnee(annee: number) {
    return this.http.get<JourFerme[]>(`http://localhost:8080/jourFerme?annee=` +annee);
  }

  ajouterJourFerme(date: Date, typeJourFerme: TypeJourFerme, commentaire: string): Observable<JourFerme> {
    return this.http.post<JourFerme>(`http://localhost:8080/jourFerme`,
      {
        date: `${date}`,
        typeJourFerme: `${typeJourFerme}`,
        commentaire: `${commentaire}`
      });
  }

}
