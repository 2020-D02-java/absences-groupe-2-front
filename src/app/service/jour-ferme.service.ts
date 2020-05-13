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

  // Constructeur
  constructor(private http: HttpClient) { }

  // Lister tous les jours fermes
  listerJourFerme() {
    return this.http.get<JourFermeVisualisation[]>(`http://localhost:8080/jourFerme`);
  }

  // Lister tous les jours fermes, filtre par années
  listerJourFermeParAnnee(annee: number) {
    return this.http.get<JourFermeVisualisation[]>(`http://localhost:8080/jourFerme/date?annee=` + annee);
  }

  // Récupérer données d'un jour fermé, VIA ID
  getJourFermeParId(id: number) {
    return this.http.get<JourFermeVisualisation>(`http://localhost:8080/jourFerme/id?id=` + id);
  }

  // Ajouter un jour fermé
  ajouterJourFerme(date: Date, type: TypeJourFerme, commentaire: string): Observable<JourFermeAjout> {
    return this.http.post<JourFermeAjout>(`http://localhost:8080/jourFerme`,
      {
        date: `${date}`,
        type: `${type}`,
        commentaire: `${commentaire}`
      });
  }

  // Modifier un jour fermé
  modifierJourFerme(id: number, date: Date, type: TypeJourFerme, commentaire: string): Observable<JourFermeVisualisation> {
    return this.http.put<JourFermeVisualisation>(`http://localhost:8080/jourFerme/modification?id=` + id,
      {
        date: `${date}`,
        type: `${type}`,
        commentaire: `${commentaire}`
      });
  }

  // Supprimer un jour fermé
  suppressionJourFerme(id: number): Observable<JourFermeVisualisation> {
    return this.http.delete<JourFermeVisualisation>(`http://localhost:8080/jourFerme/delete?id=${id}`);
  }

}
