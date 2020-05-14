import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AbsenceVisualisation } from '../models/absence-visualisation';
import { Observable } from 'rxjs';
import { Solde } from '../models/solde';
import { TypeAbsence } from '../models/type-absence';
import { AbsenceDemande } from '../models/absence-demande';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  // Constructeur
  constructor(private http: HttpClient, private authService: AuthService) { }

  // Lister toutes les absences collegue
  listerAbsencesCollegue(): Observable<AbsenceVisualisation[]> {
    return this.http.get<AbsenceVisualisation[]>(`http://localhost:8080/absences`);
  }

  // Lister tous les soldes collegue
  listerSoldesCollegue(): Observable<Solde[]> {
    return this.http.get<Solde[]>(`http://localhost:8080/soldes`);
  }

   // R�cup�rer donn�es d'une absence, VIA ID
   getAbsenceParId(id: number) {
    return this.http.get<AbsenceVisualisation>(`http://localhost:8080/absences/id?id=` + id);
  }

  // Ajouter une absence
  demanderAbsence(dateDebut: Date, dateFin: Date, type: TypeAbsence, motif: string, statut: string): Observable<AbsenceDemande> {
    return this.http.post<AbsenceDemande>(`http://localhost:8080/absences`,
      {
        dateDebut: `${dateDebut}`,
        dateFin: `${dateFin}`,
        type: `${type}`,
        motif: `${motif}`,
        statut: `${statut}`
      });
  }

  // Modifier une absence, VIA ID
  modifierAbsence(id: number, dateDebut: Date, dateFin: Date, type: TypeAbsence, motif: string, statut: string)
  : Observable<AbsenceVisualisation> {
    return this.http.put<AbsenceVisualisation>(`http://localhost:8080/absences/modification?id=` + id,
      {
        dateDebut: `${dateDebut}`,
        dateFin: `${dateFin}`,
        type: `${type}`,
        motif: `${motif}`,
        statut: `${statut}`
      });
  }

  // Suppression d'une absence, VIA ID
  suppressionAbsence(id: number): Observable<AbsenceVisualisation> {
    return this.http.delete<AbsenceVisualisation>(`http://localhost:8080/absences/delete?id=${id}`);
  }

    // Traitement de nuit
    traitementDeNuit(): Observable<void>{
      return this.http.post<void>(`http://localhost:8080/absences/traitement-de-nuit`, {});
    }
}
