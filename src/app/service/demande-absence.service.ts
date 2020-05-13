import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Absence } from '../models/absence';
import { TypeAbsence } from '../models/type-absence';

@Injectable({
  providedIn: 'root'
})
export class DemandeAbsenceService {


  constructor(private http: HttpClient) { }


  ajouterAbsence(dateDebut: Date, dateFin: Date, type: TypeAbsence, motif: string, statut: string): Observable<Absence> {
    return this.http.post<Absence>(`http://localhost:8080/demandeAbsence`,
      {
        dateDebut: `${dateDebut}`,
        dateFin: `${dateFin}`,
        type: `${TypeAbsence}`,
        motif: `${motif}`,
        statut: `${statut}`
      });
  }

}
