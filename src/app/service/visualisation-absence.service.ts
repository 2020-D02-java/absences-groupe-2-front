import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Absence } from '../models/absence';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Solde } from '../models/solde';

@Injectable({
  providedIn: 'root'
})
export class VisualisationAbsenceService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  listerAbsencesCollegue(): Observable<Absence[]> {
    return this.http.get<Absence[]>(`http://localhost:8080/absences`);
  }

  listerSoldesCollegue(): Observable<Solde[]> {
    return this.http.get<Solde[]>(`http://localhost:8080/soldes`);
  }

  suppressionAbsence(id: number): Observable<Absence> {
    return this.http.delete<Absence>(`http://localhost:8080/absences/delete?id=${id}`);
  }
}
