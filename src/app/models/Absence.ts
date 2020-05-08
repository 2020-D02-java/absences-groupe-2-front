import { TypeAbsence } from './TypeAbsence';
import { Statut } from './Statut';

export class Absence {

    dateDebut: Date;
    dateFin: Date;
    typeAbsence: TypeAbsence;
    motif: string;
    statut : Statut;

}