import { Hex, Resource } from "../src/main";
import { randomize, developement_Cards, Player } from '../src/classes/Player.ts';

describe('developement_Cards class', () => {
   it('should initialize with an empty hand', () => {
        let devCards = new developement_Cards();
        expect(devCards.getCards()).toHaveLength(0);
    });

    it('should draw cards correctly', () => {
        let devCards = new developement_Cards();
        devCards.Drawhand_developement(3);
        expect(devCards.getCards()).toHaveLength(3);
    });

    it('should remove a card correctly', () => {
        let devCards = new developement_Cards();
        devCards.Drawhand_developement(3);
        let initialLength = devCards.getCards().length;
        devCards.remove_developementcard(0);
        expect(devCards.getCards()).toHaveLength(initialLength - 1);
    });

});

describe('Player class', () => {

    it('should return correct resource for a given terrain type', () => {
        let player = new Player();
        expect(player.checkResource(Hex.hills)).toBe(Resource.brick);
        expect(player.checkResource(Hex.forest)).toBe(Resource.wood);
    });

    it('should increment resources correctly', () => {
        let player = new Player();
        player.increment_resource(2, Resource.wood);
        expect(player.getResources_types(Resource.wood)).toBe(2);
    });

    it('should increment road count correctly', () => {
        let player = new Player();
        player.roadscounter();
        expect(player.roads_count).toBe(1);
    });

    it('should throw an error for invalid terrain type', () => {
        let player = new Player();
        expect(() => player.checkResource(Hex.invalid)).toThrow('Invalid terrain type');
    });
});