import { TypeAbsence } from './type-absence';
import { Statut } from './statut';

export class Absence{
  constructor(public dateDebut: Date, public dateFin: Date, public typeAbsence: TypeAbsence, public statutAbsence: Statut){

  }

}
