import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Collegue } from '../auth/auth.domains';

@Injectable({
  providedIn: 'root'
})
export class CollegueService {

  constructor(private http: HttpClient) { }

  // Lister tous les collegues existant
    listerCollegues() {
    return this.http.get<Collegue[]>(`http://localhost:8080/collegue`);
  }
}
