import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Collegue } from '../auth/auth.domains';
import { environment } from 'src/environments/environment';

const URL_BACKEND = environment.baseUrl + 'collegue';

@Injectable({
  providedIn: 'root'
})
export class CollegueService {

  // Constructeur
  constructor(private http: HttpClient) { }

  // Lister tous les collegues existant
  listerCollegues() {
    return this.http.get<Collegue[]>(`${URL_BACKEND}`);
  }
}
