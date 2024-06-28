/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { Player } from './Player';
import { Board } from './Board';
export class GameRules{
    dice_1 = 0;
    dice_2 = 0;
    
    player_amt:number
    players:Player[]

    board:Board

    constructor(player_amt:number){
        this.player_amt = player_amt
        
        this.players = Array.from({length:4})

        this.board = new Board()
    }
    roll_dice():number{
        let die = (rand:number)=> Math.floor(rand * 6) + 1
        return die(Math.random()) + die(Math.random())
    }
}