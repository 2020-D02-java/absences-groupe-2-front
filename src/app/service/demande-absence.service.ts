import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { AbsenceDemande } from '../models/absence-demande';
import { TypeAbsence } from '../models/type-absence';
import { AbsenceVisualisation } from '../models/absence-visualisation';
import { Statut } from '../models/statut';
import { environment } from 'src/environments/environment';

const URL_BACKEND = environment.baseUrl + 'absences';
@Injectable({
  providedIn: 'root'
})
export class DemandeAbsenceService {


  constructor(private http: HttpClient) { }


  ajouterAbsence(dateDebut: Date, dateFin: Date, type: TypeAbsence, motif: string, statut: string): Observable<AbsenceDemande> {
    return this.http.post<AbsenceDemande>(`${URL_BACKEND}`,
      {
        dateDebut: `${dateDebut}`,
        dateFin: `${dateFin}`,
        type: `${type}`,
        motif: `${motif}`,
        statut: `${statut}`
      });
  }

  getAbsencesparStatut(statut: Statut) {
    return this.http.get<AbsenceVisualisation[]>(`${URL_BACKEND}/statut?statut=` +statut);
  }

  validerDemande(id: number) {
    return this.http.put<AbsenceVisualisation>(`${URL_BACKEND}?id=` +id,
    {
      id: `${id}`,
      statut: Statut.VALIDEE
    });
  }

  refuserDemande(id: number) {
    return this.http.put<AbsenceVisualisation>(`${URL_BACKEND}/refuser?id=` +id,
    {
      id: `${id}`,
      statut: Statut.REJETEE
    });
  }

}
