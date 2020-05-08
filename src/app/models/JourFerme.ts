import { TypeJourFerme } from './typeJourFerme';

export class JourFerme{
	constructor(public date: Date, public typeJour: TypeJourFerme, public commentaire: string){
        date = date;
        typeJour = typeJour;
        commentaire = commentaire;
	}
}