import { TypeJourFerme } from './type-jour-ferme';


export class JourFerme{
	constructor(public date: Date, public type: TypeJourFerme, public commentaire: string){
	}
}
