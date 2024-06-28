
import { Resource,node } from "./catan_types";


// enum differentcards_developement { //25 cards = 14 Soldier + 6 Progress + 5 Victory
//     Soldier, Progress, Victory
// }


// function getrandomcards(){
//     //randomizer 

//     switch (differentcards_developement){   
//         case :

//         case ://card name 
//         //function card
//         case : 
//     }
// } 

//card effect
type card = {
    name:string;
    description: string;
    function: () => void;
}

let deck: any = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3]; // 1 = knight, 2 = progress, 3 = victory

export class developement_Cards {
    cardsInHand_developement: card[];
    knight: card;
    progress1: card;
    progress2: card;
    progress3: card;
    victory: card;

    constructor() {
        this.cardsInHand_developement = [];
        this.knight = {
            name: "knight card",
            description: "",
            function: () =>{
                
            }
        };

        this.progress1 = {
            name: "Road building card",
            description: "",
            function: () =>{
                
            }
        };

        this.progress2 = {
            name: "Year of Plenty card",
            description: "",
            function: () =>{
                
            }
        };

        this.progress3 = {
            name: "Monopoly",
            description: "",
            function: () =>{
                
            }
        };

        this.victory = {
            name: "victory card",
            description: "",
            function: () =>{
                
            }
        };

        this.knight = {
            name: "knight",
            description: "",
            function: () =>{
                
            }
        };
        
        let swapdeck = (knight: card, progress1: card, progres2: card, progress3: card, victory: card) => {
            let p1count = 0;
            let p2count = 0;
            let p3count = 0;
            deck.forEach((number: number, index: number) => {

                if(number === 1){
                    deck[index] = knight;
                }else if(number === 2){
                    //random progress card??
                    //or only selective 3
                    if(p1count !== 2){
                        deck[index] = progress1;
                        p1count++;
                    }else if (p2count !== 2){   
                        deck[index] = progres2;
                        p2count++;
                    }else if(p3count !== 2){
                        deck[index] = progress3;
                        p3count++;
                    }
                }else if(number === 3){
                    deck[index] = victory;
                }
            });
        };

    }

    Drawhand_developement(nums: number) {
        //num = number of cards we draw
        //randomizer of numbers that represent cards
        //push into the array

        randomize(deck, deck.length);
        for(let i = 0; i < nums; i++){
            this.cardsInHand_developement.push(deck[i]);
            deck.pop();
        }
    }

    remove_developementcard(index: number): boolean {
        if (index !== -1) {
            this.cardsInHand_developement.splice(index, 1);
            return true;
        }
        return false;
    }

    //usecard (arr: number[], index: number){
        
    // }



    getCards(): card[] {
        return this.cardsInHand_developement;
    }
}

export class Player{
    resources: { [key in Resource]: number };
    settlement_count: number;
    settlement_location: number[]
    roads_count: number;
    roads_location: number[];



    constructor() { //if player are in these terrain add to resources
        this.resources = {
            [Resource.brick]: 0,
            [Resource.wood]: 0,
            [Resource.ore]: 0,
            [Resource.wheat]: 0,
            [Resource.sheep]: 0,
        };
        
        this.settlement_count = 0;
        this.roads_count = 0;
        this.roads_location = [];
        this.settlement_location = []
        
    
    }

    increment_resource(num: number, territorytype: Resource){
        this.resources[territorytype] += num;
    }

    getResources_types(resourceType: Resource){ //see resource amounts
        return this.resources[resourceType];
    }

    roadscounter(){ 
        this.roads_count++;
    }

    checkRoads(node:node){
        const playerRoads = node.edges.filter((edge:node) => edge.road === this);
        return playerRoads.length >= 2 || playerRoads.length > 0;
    }

    checkSettlement(node:node){
        const playerRoads = node.edges.filter((edge:node) => edge.road === this);
        const playerSettlementOrCity = node.settlement != null && node.settlement.player === this;
        return (playerRoads.length >= 2 || playerSettlementOrCity) 
    }


}

export function randomize(deck: number[], length: number) {
    throw new Error("Function not implemented.");
}
