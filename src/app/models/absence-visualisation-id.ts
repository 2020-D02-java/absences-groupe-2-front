import { TypeAbsence } from './type-absence';
import { Statut } from './statut';

// Utilisé pour afficher toutes les absences, en remontant egalement l'id du collaborateur auquel est attribué l'absence
export class AbsenceVisualisationId {
  constructor(public id: number, public dateDebut: Date, public dateFin: Date, public type: TypeAbsence, public motif: string,
    public statut: Statut, public emailCollegue: string) {
  }

}
