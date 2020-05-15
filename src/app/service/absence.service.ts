import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AbsenceVisualisation } from '../models/absence-visualisation';
import { Observable } from 'rxjs';
import { Solde } from '../models/solde';
import { TypeAbsence } from '../models/type-absence';
import { AbsenceDemande } from '../models/absence-demande';
import { environment } from 'src/environments/environment';
import { AbsenceVisualisationId } from '../models/absence-visualisation-id';

const URL_BACKEND_ABSENCE = environment.baseUrl + 'absences';
const URL_BACKEND_SOLDE = environment.baseUrl + 'soldes';
@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  // Constructeur
  constructor(private http: HttpClient, private authService: AuthService) { }

  // Lister toutes les absences collegue email
  listerAbsencesCollegue(): Observable<AbsenceVisualisation[]> {
    return this.http.get<AbsenceVisualisation[]>(`${URL_BACKEND_ABSENCE}`);
  }

    // Lister toutes les absences
  listerAbsencesToutesCollegue(): Observable<AbsenceVisualisationId[]> {
    return this.http.get<AbsenceVisualisationId[]>(`${URL_BACKEND_ABSENCE}/all`);
  }

  // Lister tous les soldes collegue
  listerSoldesCollegue(): Observable<Solde[]> {
    return this.http.get<Solde[]>(`${URL_BACKEND_SOLDE}`);
  }

   // R�cup�rer donn�es d'une absence, VIA ID
   getAbsenceParId(id: number) {
    return this.http.get<AbsenceVisualisation>(`${URL_BACKEND_ABSENCE}/id?id=` + id);
  }

  // Ajouter une absence
  demanderAbsence(dateDebut: Date, dateFin: Date, type: TypeAbsence, motif: string, statut: string): Observable<AbsenceDemande> {
    return this.http.post<AbsenceDemande>(`${URL_BACKEND_ABSENCE}`,
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
    return this.http.put<AbsenceVisualisation>(`${URL_BACKEND_ABSENCE}/modification?id=` + id,
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
    return this.http.delete<AbsenceVisualisation>(`${URL_BACKEND_ABSENCE}/delete?id=${id}`);
  }
}
