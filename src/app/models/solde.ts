import { TypeAbsence } from './type-absence';
import { Collegue } from '../auth/auth.domains';

export class Solde {
  constructor(public nombreDeJours: number, public type: TypeAbsence){
  };

}
