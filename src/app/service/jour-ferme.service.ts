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
    return this.http.get<JourFerme[]>(`http://localhost:8080/jourFerme/date?annee=` +annee);
  }

  getJourFermeParId(id: number) {
    return this.http.get<JourFerme>('http://localhost:8080/jourFerme/id?id=' +id);
  }

  ajouterJourFerme(date: Date, typeJourFerme: TypeJourFerme, commentaire: string): Observable<JourFerme> {
    return this.http.post<JourFerme>(`http://localhost:8080/jourFerme`,
      {
        date: `${date}`,
        typeJourFerme: `${typeJourFerme}`,
        commentaire: `${commentaire}`
      });
  }

  modifierJourFerme(id: number, date: Date, typeJourFerme: TypeJourFerme, commentaire: string): Observable<JourFerme> {
    return this.http.put<JourFerme>(`http://localhost:8080/jourFerme/modification?id=` +id,
      {
        date: `${date}`,
        typeJourFerme: `${typeJourFerme}`,
        commentaire: `${commentaire}`
      });
  }

  suppressionJourFerme(id: number): Observable<JourFerme>{
    return this.http.delete<JourFerme>(`http://localhost:8080/jourFerme/delete?id=${id}`);
  }

}
