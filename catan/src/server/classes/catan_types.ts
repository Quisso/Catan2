export enum Hex { hills = "hills" , forest = "forest" , mountain = "mountain" , fields = "fields" , pasture = "pasture" , desert = "desert" , sea = "sea"}
export enum Resource { brick = "brick" , wood = "wood" , ore = "ore", wheat = "wheat", sheep = "sheep" }
export enum Color { red , white , orange , blue}
export enum Building { road , settlement , city , dev_card}

export type Settlement = {
    color: Color
    is_city: boolean
}
export interface Preset {
    name:string
    width:number
    height:number
    tile_config: Record<string, number>
    tokens: number[]
    harbors: Record<number, string | null>
}
export function shuffleArray<T>(arr:T[]):T[]{
    return arr.map(a=>({val:a , sort:Math.random()}))
    .sort((a, b)=>a.sort-b.sort)
    .map(a=>a.val)
}
export const ProductionConversion = new Map<Hex, Resource | null>([
    [Hex.hills, Resource.brick],
    [Hex.forest, Resource.wood],
    [Hex.mountain, Resource.ore],
    [Hex.fields, Resource.wheat],
    [Hex.pasture, Resource.sheep],
    [Hex.desert, null],
    [Hex.sea, null],
])