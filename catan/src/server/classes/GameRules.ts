/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { Player } from './Player';
import { Board } from './Board';
import { Resource , Building } from "./catan_types"

export class GameRules{
    dice_1 = 0;
    dice_2 = 0;
    
    player_amt:number
    players:Player[]

    board:Board


    private building_costs: Readonly<{[key in Building]: Resource[]}> ={
        [Building.road] : [Resource.brick, Resource.wood],
        [Building.settlement] : [Resource.brick, Resource.wood, Resource.wheat, Resource.sheep],
        [Building.city] : [Resource.ore, Resource.ore, Resource.ore, Resource.wheat, Resource.wheat],
        [Building.dev_card] : [Resource.ore, Resource.wheat, Resource.sheep],
    }
    constructor(player_amt:number){
        this.player_amt = player_amt
        
        this.players = Array.from({length:this.player_amt}, ()=>new Player())

        this.board = new Board()
    }
    rollForTurnOrder(){
        const order = this.players
        .map(p=>({player:p, turn:0}))

        while(order.some(p=>p.turn===0)){
            order.map(p=>p.turn = p.turn === 0 ? p.player.roll_dice():p.turn)
            order.sort((a, b)=>a.turn-b.turn)
            order.reduce((acc, p)=>{
                let retVal = p.turn
                if(acc === p.turn)
                    p.turn = 0
                return retVal
            }, 0)
        }

        this.players = order.map(p=>p.player)
        this.players.forEach((p, i)=>p.set_order(i))
    }
    buildStartingSettlements(){
        let i = 0;
        // for(;i<this.player_amt;i++){
            
        // }
        // for(;i>=0;i--){

        // }

    }
    private build(player: Player, coords:number, building: Building){
        for(const res of this.building_costs[building] as Resource[]){
            player.decrement_resource(res)
        }
        if(building === Building.settlement || building === Building.city){
            player.increment_victorypoint
        }

        this.board.place(coords, building)
        

    }
}