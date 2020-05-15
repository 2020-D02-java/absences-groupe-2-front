import { TypeAbsence } from './type-absence';
import { Statut } from './statut';

// Utilis� pour afficher toutes les absences, en remontant egalement l'id du collaborateur auquel est attribu� l'absence
export class AbsenceVisualisationId {
  constructor(public id: number, public dateDebut: Date, public dateFin: Date, public type: TypeAbsence, public motif: string,
    public statut: Statut, public emailCollegue: string) {
  }

}
