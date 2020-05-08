import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Absence } from '../models/absence';
import { Observable } from 'rxjs';
import { Collegue } from '../auth/auth.domains';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VisualisationAbsenceService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  listerAbsenceCollegue(email: string): Observable<Absence[]>{
    return this.http.get<Absence[]>(`http://localhost:8080/absences?email=${email}`);
  }
}
