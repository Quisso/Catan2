/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { shuffleArray , Hex , Resource , Color , Settlement , Building , Preset , ProductionConversion} from "./catan_types"


type tile = {
    hex: Hex
    resource: Resource | null
    token: number
    nodes: node[]
}
type node = {
    settlement: Settlement | null
    harbor: Resource | undefined | null
    tiles: tile[]
    edges: edge[]
}
type edge = {
    road: Color | null//player
    nodes: node[]
}

class Node_Tile_Init{
    /* Indicies
         0_______1
         /       \
        /         \
      2<           >3
        \         / 
         \_______/
         4       5
    */
    protected node_amt:number;
    protected tile_amt:number
   
    private tile_rows: number[]
    private node_rows: number[]
    constructor(height:number , width:number){
        const tile_mid = Math.floor(height/2)
        if(tile_mid%2 !== 0) throw Error("board height is not constructable (even board height)")
        this.tile_rows = new Array(height).fill(0)
        this.node_rows = new Array(height+1).fill(0)
        for(let i = 0; i<tile_mid; i++){
            const row = width-(tile_mid-i)
            this.tile_rows[i] = row
            this.tile_rows[height-1-i] = row

            this.node_rows[i] = row*2+1
            this.node_rows[height-i] = row*2+1
        }

        this.node_amt = this.node_rows.reduce((acc, n)=>acc+n)
        this.tile_amt = this.tile_rows.reduce((acc, n)=>acc+n)

    }
    private getRow(index:number, row_amts:number[]):number{
        if(index<0) return -1
        for(let i = 0; i < row_amts.length; i++){
            if(index < row_amts[i]) return i
            index-=row_amts[i]
        }
        return -1;
    }
    private getCol(index:number, row_amts:number[]):number{
        if(index<0) return -1
        for(let row of row_amts){
            if(index < row) return index
            index-=row
        }
        return -1;
    }
    private getIndex(row:number, col:number, row_amts:number[]):number{
        if(row<0||col<0||row>=row_amts.length||col>=row_amts[row]) return -1
        return row_amts.reduce((acc, e)=>{
            if(row === 0) acc+=col
            if(row > 0) acc+=e
            row--
            return acc
        }, 0)
    }
    protected get_nodes_from_tile(tIndex:number): number[]{
        let nIndex:number[] = []
        let row = this.getRow(tIndex, this.tile_rows)
        let col = this.getCol(tIndex, this.tile_rows)*2

        let topRowOffset = row>Math.floor(this.tile_rows.length/2) ? 1:0
        let bottomRowOffset = row<Math.floor(this.tile_rows.length/2) ? 1:0
        
        for(let c = col; c<col+3; c++){
            nIndex.push(this.getIndex(row, c+topRowOffset, this.node_rows))
        }
        for(let c = col+2; c>=col; c--){
            nIndex.push(this.getIndex(row+1, c+bottomRowOffset, this.node_rows))
        }
        return nIndex;
    }
}


export class Board extends Node_Tile_Init{

    /* (harbor)
               (00)(01) 02 (03)(04) 05  06  
           (07) 08  09  10  11  12  13 (14)(15)
        16 (17) 18  19  20  21  22  23  24  25 (26)
        27 (28) 29  30  31  32  33  34  35  36 (37)
           (38) 39  40  41  42  43  44 (45)(46)
               (47)(48) 49 (50)(51) 52  53
    */
    
    private tile_config: { hex:Hex , amt:number }[]
    private tile_layout: tile[];
    private robber: number;

    private game_state: {nodes: node[], edges: edge[]};

    private harbor_nodes: Readonly<Map<number, Resource | null>> = new Map([
        [0, null], [1, null],
        [3, Resource.sheep], [4, Resource.sheep],
        [7, null], [14, null],
        [15, null], [17, null],
        [26, Resource.brick], [28, Resource.brick],
        [37, Resource.wood], [38, Resource.wood],
        [45, null], [46, null],
        [47, Resource.wheat], [48, Resource.wheat],
        [50, Resource.ore], [51, Resource.ore],
    ])

    constructor(preset:Preset) {
        super(5, 5)
        this.tile_config = preset.tile_config

        //token randomization
        let token_layout = shuffleArray(
            new Array(18).fill(0)
            .map((_, ti)=>ti>=5 ? ti+3 : ti+2)//skips 7
            .copyWithin(10, 1, 10)//copies 3-11
        )
        //resource randomization
        let resource_list:Hex[] = 
            shuffleArray(this.tile_config.map(c=>Array(c.amt).fill(c.hex)).flat())
            
        //tile_layout population
        this.tile_layout = Array.from(resource_list)
        .map(t=>{
            return {
                hex: t,
                resource: ProductionConversion.get(t),
                token: t === Hex.desert ? 0 : token_layout,
                nodes: []
            } as tile
        })
        //this.tile_layout = shuffleArray(this.tile_layout) should i shuffle again?


        this.robber = this.tile_layout.findIndex(t=>t.hex === Hex.desert)

        //game state init
        this.game_state = {nodes: [], edges: []}
        for(let i = 0; i<this.node_amt; i++){
            this.game_state.nodes[i] = {
                settlement: null,
                harbor: this.harbor_nodes.has(i) ? this.harbor_nodes.get(i) as Resource | undefined : null,
                tiles: [],
                edges: [],
            }
        }

        //linkages
        this.tile_layout.forEach((t, ti)=>{
            //node and edge linkage
            this.get_nodes_from_tile(ti)
            .map((n, i, ns)=> 
                this.makeEdge(this.game_state.nodes[n], this.game_state.nodes[ns[(i+1)%6]]
            ))
            .filter(e=>e!==null).map(e=>e as edge)
            .forEach(e=>this.game_state.edges.push(e))
            
            //tiles and nodes linkage
            t.nodes = this.get_nodes_from_tile(ti).map(ni=>this.game_state.nodes[ni])
            t.nodes.forEach(n=>n.tiles.push(t))
        })
        
        //esures no 6's or 8's are next to each other on the board
        let is6or8 = (x:tile):boolean=>x.token == 6 || x.token == 8
        let adj6or8 = (t:tile):boolean=>this.getAdjacentTiles(t).some(adjt=>is6or8(adjt))
        let fixRule = (rule_break_tile:tile)=>{ 
            let rule_tile = shuffleArray(this.tile_layout.filter(t=>!is6or8(t) && !adj6or8(t)))[0]
            let temp = rule_break_tile.token
            rule_break_tile.token = rule_tile.token
            rule_tile.token = temp
        }
        this.tile_layout.forEach(t=>is6or8(t) && adj6or8(t) ? fixRule(t) :0)
    }

/***********************************END OF CONSTRUCTOR*********************************************/
    public getRobber() {
        return this.robber
    }
    public moveRobber(index:number) {
        this.robber = index
    }
    public getSettlementsfromToken(token: number):Settlement[] {
        return this.tile_layout
        .filter(t=>t.token === token)
        .map(t=>
            t.nodes
            .filter(n=>n !== null)
            .map(n=>n.settlement as Exclude<node["settlement"], null>)
        ).flat()
    }
    public getAdjacentTiles(tile: tile):tile[] {
        return tile.nodes
        .map(n=>n.tiles)
        .flat()
        .filter((t, i, ts) => ts.indexOf(t) === i)
        .filter(t=>t===tile)
    }
    public place(coords: number, building:Building){
        
    }
    
    private fix_adjacent_6_and_8s(){
        let is6or8 = (x:tile):boolean=>x.token == 6 || x.token == 8
        let adj6or8 = (t:tile):boolean=>this.getAdjacentTiles(t).some(adjt=>is6or8(adjt))
        let fixRule = (rule_break_tile:tile)=>{ 
            let rule_tile = shuffleArray(this.tile_layout.filter(t=>!is6or8(t) && !adj6or8(t)))[0]
            let temp = rule_break_tile.token
            rule_break_tile.token = rule_tile.token
            rule_tile.token = temp
        }
        this.tile_layout.forEach(t=>is6or8(t) && adj6or8(t) ? fixRule(t) :0)
        return this.tile_layout.map(t=>t.token)
    }
    private makeEdge(n1:node, n2:node): edge | null {
        if(n1.edges.some(e=>e.nodes.find(v=>v===n2)!== undefined)) return null
        if(n1.edges.length > 2 || n2.edges.length > 2) throw console.error("too many edges");
        let edge:edge = {
            road: null,
            nodes: [n1, n2],
        }
        n1.edges.push(edge)
        n2.edges.push(edge)
        return edge
    }
    
}

import fs from "fs"

async function savePreset(preset:Preset) {
    try {
        await fs.writeFile('./'+preset.name+'.json', JSON.stringify(preset), 
            err => {
                // Checking for errors 
                if (err) throw err;
        
                // Success 
                console.log("Done writing");
            });
    } catch (err) {
        console.log(err);
    }
}
savePreset({
    name: "Base",
    height: 5,
    width: 5, 
    tile_config: {
        [Hex.hills]: 3,
        [Hex.forest]: 4,
        [Hex.mountain]: 3,
        [Hex.fields]: 4,
        [Hex.pasture]: 4,
        [Hex.desert]: 1,
    },
    tokens: [2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12],
    harbors: {
        0: null, 1:null,
        3:Resource.sheep, 4:Resource.sheep,
        7:null, 14:null,
        15:null, 17:null,
        26:Resource.brick, 28:Resource.brick,
        37:Resource.wood, 38:Resource.wood,
        45:null, 46:null,
        47:Resource.wheat, 48:Resource.wheat,
        50:Resource.ore, 51:Resource.ore,
    }
} as Preset)