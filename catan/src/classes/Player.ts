/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */

import { Resource, shuffleArray } from "./catan_types";

//card effect
type card = {
    name:string;
    description: string;
    function: (...args: any) => any;
}

// 1 = knight, 2 = progress, 3 = victory

export class developement_Cards {
    cardsInHand_developement: card[];
    knight: card;
    progress1: card;
    progress2: card;
    progress3: card;
    victory: card;
    deck: card[];
    board: any;
    player: Player;

    constructor(player: Player) {
        this.cardsInHand_developement = [];
        this.knight = {
            name: "knight card",
            description: "Move the thief to a chosen location",
            function: (num: number) =>{
                return this.board.movethieflocation(num);
            }
        };

        this.progress1 = {
            name: "Road building card",
            description: "Build 2 road at any location of player's choosing",
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

        this.player = player;
        this.victory = {
            name: "victory card",
            description: "when called give player one point",
            function: () =>{
                this.player.victory_pts++;
            }
        };
        
        this.deck = [
            this.knight, this.knight, this.knight, this.knight, this.knight,
            this.knight, this.knight, this.knight, this.knight, this.knight,
            this.knight, this.knight, this.knight, this.knight,
            this.progress1, this.progress1, 
            this.progress2, this.progress2, 
            this.progress3, this.progress3,
            this.victory, this.victory, this.victory, this.victory, this.victory
        ];
        
    }


    Drawhand_developement(nums: number) {
        //num = number of cards we draw
        //randomizer of numbers that represent cards
        //push into the array

        shuffleArray(this.deck);
        for(let i = 0; i < nums; i++){
            this.cardsInHand_developement.push(this.deck[i]);
            this.deck.pop();
        }
    }

    remove_developementcard(index: number): boolean {
        if (index !== -1) {
            this.cardsInHand_developement.splice(index, 1);
            return true;
        }
        return false;
    }

    usecard(){
        
    }

    getCards(): card[] {
        return this.cardsInHand_developement;
    }
}

export class Player{
    resources: { [key in Resource]: number };
    settlement_count: number;
    roads_count: number;
    roads_location: number[];
    victory_pts: number;
    developmentCards: developement_Cards;

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
        this.victory_pts = 0;
        this.developmentCards = new developement_Cards(this);
    
    }

    upgrade(){

    }

    buy_settlement(amount_settlement: number){

    }

    buy_road(amount_road: number){
    
    }

    buy_card(amount_card: number){
        
        //check if we got the resource if we do buy / draw
        //if not throw error

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


}


