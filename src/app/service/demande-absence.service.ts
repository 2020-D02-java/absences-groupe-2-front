import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { AbsenceDemande } from '../models/absence-demande';
import { TypeAbsence } from '../models/type-absence';

@Injectable({
  providedIn: 'root'
})
export class DemandeAbsenceService {


  constructor(private http: HttpClient) { }


  ajouterAbsence(dateDebut: Date, dateFin: Date, type: TypeAbsence, motif: string, statut: string): Observable<AbsenceDemande> {
    return this.http.post<AbsenceDemande>(`http://localhost:8080/absences`,
      {
        dateDebut: `${dateDebut}`,
        dateFin: `${dateFin}`,
        type: `${type}`,
        motif: `${motif}`,
        statut: `${statut}`
      });
  }

}
