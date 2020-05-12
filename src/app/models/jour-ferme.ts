import { TypeJourFerme } from './type-jour-ferme';


export class JourFerme{
	constructor(public id: number, public date: Date, public type: TypeJourFerme, public commentaire: string){
	}
}
