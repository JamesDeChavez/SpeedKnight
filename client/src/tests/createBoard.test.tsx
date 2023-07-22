import { createBoard, determineValidMoves } from "../game/functions"

describe("createBoard", () => {
    it('should return the correct board based on the given inputs', () => {
        const board1 = createBoard(3, 3, 7, 6, false)
        const board2 = createBoard(0, 0, 5, 4, false)
        const board3 = createBoard(1, 1, 2, 3, false)
        const board4 = createBoard(7, 7, 0, 0, false)
        const board5 = createBoard(4, 5, 5, 4, true)

        for (let i = 0; i < board1.length; i++) {
            for (let j = 0; j < board1[i].length; j++) {
                expect(JSON.stringify(board1[i][j])).toBe(JSON.stringify({
                    backgroundColor: (i + j) % 2 === 0 
                        ? '#f0d9b5' : '#b58863',
                    knightVisible: (i === 7 && j === 6) ? true : false,
                    pawnVisible: (i === 3 && j === 3) ? true : false,
                    validMove: false
                }))
            }
        }

        for (let i = 0; i < board2.length; i++) {
            for (let j = 0; j < board2[i].length; j++) {
                expect(JSON.stringify(board2[i][j])).toBe(JSON.stringify({
                    backgroundColor: (i + j) % 2 === 0 
                        ? '#f0d9b5' : '#b58863',
                    knightVisible: (i === 5 && j === 4) ? true : false,
                    pawnVisible: (i === 0 && j === 0) ? true : false,
                    validMove: false
                }))
            }
        }

        for (let i = 0; i < board3.length; i++) {
            for (let j = 0; j < board3[i].length; j++) {
                expect(JSON.stringify(board3[i][j])).toBe(JSON.stringify({
                    backgroundColor: (i + j) % 2 === 0 
                        ? '#f0d9b5' : '#b58863',
                    knightVisible: (i === 2 && j === 3) ? true : false,
                    pawnVisible: (i === 1 && j === 1) ? true : false,
                    validMove: false
                }))
            }
        }

        for (let i = 0; i < board4.length; i++) {
            for (let j = 0; j < board4[i].length; j++) {
                expect(JSON.stringify(board4[i][j])).toBe(JSON.stringify({
                    backgroundColor: (i + j) % 2 === 0 
                        ? '#f0d9b5' : '#b58863',
                    knightVisible: (i === 0 && j === 0) ? true : false,
                    pawnVisible: (i === 7 && j === 7) ? true : false,
                    validMove: false
                }))
            }
        }

        const board5ValidMoves = determineValidMoves(5, 4)
        for (let i = 0; i < board5.length; i++) {
            for (let j = 0; j < board5[i].length; j++) {
                expect(JSON.stringify(board5[i][j])).toBe(JSON.stringify({
                    backgroundColor: (i + j) % 2 === 0 
                        ? '#f0d9b5' : '#b58863',
                    knightVisible: (i === 5 && j === 4) ? true : false,
                    pawnVisible: (i === 4 && j === 5) ? true : false,
                    validMove: (JSON.stringify(board5ValidMoves).indexOf(JSON.stringify([i, j])) !== -1) ? true : false
                }))
            }
        }

    })
})
