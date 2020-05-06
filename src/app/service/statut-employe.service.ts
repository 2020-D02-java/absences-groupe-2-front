import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatutEmployeService {

  constructor(private _authSrv: AuthService, private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._authSrv.verifierAuthentification()
      .pipe(
        map(col => {
          for (const role of col.roles){
            if (role.match('ROLE_EMPLOYE'))
            {
              // Le role employe est bien trouv�, on retourne true
              return true;
            }
          }
          // Le role employe n'a pas �t� trouv�, on retourne false
          return false;
        }),
        tap(possedeStatutAdministrateur => {
          // Cas ou il ne possede pas le role employe
          if (!possedeStatutAdministrateur) {
            // Redirection
            this._router.navigate(['/accesRefuse']);
          }
        })
      );
  }
}
