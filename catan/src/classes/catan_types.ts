export enum Tile { hills , forest , mountain , fields , pasture , desert };
export enum Resource { brick , wood , ore , wheat , sheep };
export enum Color { red , white , orange , blue};

export type settlement = {
    color: Color
    is_city: boolean
}
export type node = {
    resources: Resource[]
    edges: edge[]
    settlement: settlement
}
export type edge = {
    road: Color
    nodes: node[]
}
export function shuffleArray<T>(arr:T[]):T[]{
    return arr.map(a=>({val:a , sort:Math.random()}))
    .sort((a, b)=>a.sort-b.sort)
    .map(a=>a.val)
}