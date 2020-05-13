import { TypeAbsence } from './type-absence';
import { Statut } from './statut';

export class AbsenceDemande {
  constructor(public dateDebut: Date, public dateFin: Date, public type: TypeAbsence, public motif: string,
              public statut: Statut){
  }

}
