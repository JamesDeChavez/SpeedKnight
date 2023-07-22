import { createEmptyBoard } from "../game/functions";

describe("createEmptyBoard", () => {
    it("should create an empty board", () => {
        const board = createEmptyBoard()
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                expect(JSON.stringify(board[i][j])).toBe(JSON.stringify({
                    backgroundColor: (i + j) % 2 === 0 
                        ? '#f0d9b5' : '#b58863',
                    knightVisible: false,
                    pawnVisible: false,
                    validMove: false
                }))
            }
        }
    })
})
