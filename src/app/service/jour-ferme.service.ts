import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { TypeJourFerme } from '../models/type-jour-ferme';
import { JourFermeVisualisation } from '../models/jour-ferme-visualisation';
import { JourFermeAjout } from '../models/jour-ferme-ajout';

@Injectable({
  providedIn: 'root'
})
export class JourFermeService {

  // // Le subject est priv�, on le rend "public" avec "abonnementCollegueEnCours()"
  // private jourFermeSubject = new Subject<JourFerme>();

  constructor(private http: HttpClient) { }

  listerJourFerme() {
    return this.http.get<JourFermeVisualisation[]>(`http://localhost:8080/jourFerme`);
  }

  listerJourFermeParAnnee(annee: number) {
    return this.http.get<JourFermeVisualisation[]>(`http://localhost:8080/jourFerme/date?annee=` +annee);
  }

  getJourFermeParId(id: number) {
    return this.http.get<JourFermeVisualisation>(`http://localhost:8080/jourFerme/date?annee=`+id);
  }

  ajouterJourFerme(date: Date, type: TypeJourFerme, commentaire: string): Observable<JourFermeAjout> {
    return this.http.post<JourFermeAjout>(`http://localhost:8080/jourFerme`,
      {
        date: `${date}`,
        type: `${type}`,
        commentaire: `${commentaire}`
      });
  }

  modifierJourFerme(id: number, date: Date, typeJourFerme: TypeJourFerme, commentaire: string): Observable<JourFermeVisualisation> {
    return this.http.put<JourFermeVisualisation>(`http://localhost:8080/jourFerme/modification?id=` +id,
      {
        date: `${date}`,
        typeJourFerme: `${typeJourFerme}`,
        commentaire: `${commentaire}`
      });
  }

  suppressionJourFerme(id: number): Observable<JourFermeVisualisation>{
    return this.http.delete<JourFermeVisualisation>(`http://localhost:8080/jourFerme/delete?id=${id}`);
  }

}
