import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbsenceVisualisation } from '../models/absence-visualisation';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Solde } from '../models/solde';

@Injectable({
  providedIn: 'root'
})
export class VisualisationAbsenceService {

  // Constructeur
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  // Lister toutes les absences collegue
  listerAbsencesCollegue(): Observable<AbsenceVisualisation[]> {
    return this.http.get<AbsenceVisualisation[]>(`http://localhost:8080/absences`);
  }

  // Lister tous les soldes collegue
  listerSoldesCollegue(): Observable<Solde[]> {
    return this.http.get<Solde[]>(`http://localhost:8080/soldes`);
  }

  // Suppression d'une absence, VIA ID
  suppressionAbsence(id: number): Observable<AbsenceVisualisation> {
    return this.http.delete<AbsenceVisualisation>(`http://localhost:8080/absences/delete?id=${id}`);
  }
}
