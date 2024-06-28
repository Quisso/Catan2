
import { shuffleArray , Resource , Color , settlement} from "./catan_types"
import { Board } from './Board';  
import { Player } from './Player';
let colors = [Color.blue, Color.orange, Color.red, Color.white]
export class GameRules{
    dice_1 = 0;
    dice_2 = 0;
    
    player_amt:number
    players:Player[]

    constructor(player_amt:number){
        this.player_amt = player_amt
        
        this.players = Array.from({length:4})
        .map((_, pi)=>({player: new Player(), dice:this.roll_dice()}))
        .sort((a, b)=> a.dice - b.dice)
        .map(pwd=>pwd.player)
        console.log(this.players)
    }
    roll_dice():number{
        const die = (rand:number)=> Math.floor(rand * 6) + 1
        return die(Math.random()) + die(Math.random())
    }

    playerTurn(player:Player){

    }

    
    // check_Empty_Intersection(tile:number[],tile_nodes:node[]): boolean{
    //     let node:node;
    //     return tile.some(e => tile_nodes[e].settlement === null)
    // }
    
    
    // Gives the resorsse with the sum of the role
    ResoureProduction(dice_1:number, dice_2:number, player:Player){
        this.dice_1  = Math.floor(Math.random() * 6) + 1;
        this.dice_2 = Math.floor(Math.random() * 6) + 1;
        const sum_Of_Dice = this.dice_1 + this.dice_2;

        const board = new Board();

        // function findSettlement(nodeIndex: number): settlement | null {
        //     const node = board.game_state.nodes[nodeIndex];
        //     return node.settlement;
        // }

        // const condition = this.checkIntersection(board.getTileNodes(sum_Of_Dice),board.game_state.nodes);
        // const tile = board.tile_layout[sum_Of_Dice];

        // //based on the roll and the sum of the rolls it checks the intersection for a settlement and the rolls to give out resources
        // //  for now - settlement  
        // switch(sum_Of_Dice){
        //     case 1: 
        //     condition ? player.increment_resource(player.settlement_count,tile.resource) : null;
        //     break;
        //     case 2: 
        //     condition ? player.increment_resource(player.settlement_count,tile.resource):null;
        //     break;
        //     case 3: 
        //     condition ? player.increment_resource(player.settlement_count,tile.resource):null;
        //     break;
        //     case 4: 
        //     condition ? player.increment_resource(player.settlement_count,tile.resource):null;
        //     break;
        //     case 5: 
        //     condition ? player.increment_resource(player.settlement_count,tile.resource):null;
        //     break;
        //     case 6: 
        //     condition ? player.increment_resource(player.settlement_count,tile.resource):null;
        //     break;
        //     case 7: 
        //     condition ? player.increment_resource(player.settlement_count,tile.resource):null;
        //     break;
        //     case 8: 
        //     condition ? player.increment_resource(player.settlement_count,tile.resource):null;
        //     break;
        //     case 9: 
        //     condition ? player.increment_resource(player.settlement_count,tile.resource):null;
        //     break;
        //     case 10: 
        //     condition ? player.increment_resource(player.settlement_count,tile.resource):null;
        //     break;
        //     case 11: 
        //     condition ? player.increment_resource(player.settlement_count,tile.resource):null;
        //     break; 
        //     case 12: 
        //     condition ? player.increment_resource(player.settlement_count,tile.resource):null;
        //     break;
        //     default: Error("Non - Tile");
        // }


    }

    /*  trade(player:Player){


    }**/

   /* buildRoad(player:Player) {
        const board = new Board(3);
        const tile_nodes = board.getTileNodes(input);

        if(this.checkIntersection(tile_nodes,board.game_state.nodes)){
            tile_nodes.some(e => this.check_Empty_Intersection(e,board.game_state.nodes))
            
        }

        
        
    }

     **/

    }
