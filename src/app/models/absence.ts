import { TypeAbsence } from './type-absence';
import { Statut } from './Statut';

export class Absence {
  constructor(public dateDebut: Date, public dateFin: Date, public type: TypeAbsence, public statut: Statut){
  }

}
