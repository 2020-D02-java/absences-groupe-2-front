import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbsenceVisualisation } from '../models/absence-visualisation';
import { Observable } from 'rxjs';
import { TypeAbsence } from '../models/type-absence';

@Injectable({
  providedIn: 'root'
})
export class ModifierAbenceService {

  // Constructeur
  constructor(private http: HttpClient) { }

  // Récupérer données d'une absence, VIA ID
  getAbsenceParId(id: number) {
    return this.http.get<AbsenceVisualisation>(`http://localhost:8080/absences/id?id=` + id);
  }

  // Modifier une absence, VIA ID
  modifierAbsence(id: number, dateDebut: Date, dateFin: Date, type: TypeAbsence, motif: string, statut: string): Observable<AbsenceVisualisation> {
    return this.http.put<AbsenceVisualisation>(`http://localhost:8080/absences/modification?id=` + id,
      {
        dateDebut: `${dateDebut}`,
        dateFin: `${dateFin}`,
        type: `${type}`,
        motif: `${motif}`,
        statut: `${statut}`
      });
  }

}
