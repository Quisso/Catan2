import { Board } from "../src/classes/Board"

describe('5 x 5 board', () => {
    beforeEach(() => {
        const board = new Board();
      });
      
      afterEach(() => {
        console.log("done")
      });
    it('board has 54 nodes and 72 edges', () => {
        board.length
    })

})