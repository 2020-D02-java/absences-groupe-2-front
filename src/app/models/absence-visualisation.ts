import { TypeAbsence } from './type-absence';
import { Statut } from './statut';
import { Collegue } from '../auth/auth.domains';

export class AbsenceVisualisation {
  constructor(public id: number, public dateDebut: Date, public dateFin: Date, public type: TypeAbsence, public motif: string,
              public statut: Statut, public collegue: Collegue){
  }

}
