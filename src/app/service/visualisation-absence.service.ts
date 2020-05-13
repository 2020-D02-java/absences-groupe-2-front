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

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  listerAbsencesCollegue(): Observable<AbsenceVisualisation[]> {
    return this.http.get<AbsenceVisualisation[]>(`http://localhost:8080/absences`);
  }

  listerSoldesCollegue(): Observable<Solde[]> {
    return this.http.get<Solde[]>(`http://localhost:8080/soldes`);
  }

  suppressionAbsence(id: number): Observable<AbsenceVisualisation> {
    return this.http.delete<AbsenceVisualisation>(`http://localhost:8080/absences/delete?id=${id}`);
  }
}
