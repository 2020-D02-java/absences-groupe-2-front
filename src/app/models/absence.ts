import { TypeAbsence } from './type-absence';
import { Statut } from './statut';

export class Absence {
  constructor(public dateDebut: Date, public dateFin: Date, public type: TypeAbsence, public statut: Statut){
  }

}
