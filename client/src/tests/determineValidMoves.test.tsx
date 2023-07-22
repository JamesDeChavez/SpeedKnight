import { expect } from "vitest"
import { determineValidMoves } from "../game/functions"

describe("determineValidMoves", () => {
    it("should return valid moves for a given position", () => {
        const validMoves1 = determineValidMoves(0, 0)
        const validMoves2 = determineValidMoves(1, 1)
        const validMoves3 = determineValidMoves(2, 2)
        const validMoves4 = determineValidMoves(7, 6)
        const validMoves5 = determineValidMoves(5, 0)

        const expectedValidMoves1 = [ [2, 1], [1, 2] ]
        const expectedValidMoves2 = [ [3, 0], [3, 2], [2, 3], [0, 3] ]
        const expectedValidMoves3 = [ [4, 1], [4, 3], [3, 4], [1, 4], [0, 3], [0, 1], [1, 0], [3, 0] ]
        const expectedValidMoves4 = [ [6, 4], [5, 5], [5, 7] ]
        const expectedValidMoves5 = [ [3, 1], [4, 2], [6, 2], [7, 1] ]

        for (let i = 0; i < validMoves1.length; i++) {
            expect(JSON.stringify(expectedValidMoves1).indexOf(JSON.stringify(validMoves1[i]))).not.toBe(-1)
        }
        for (let i = 0; i < validMoves2.length; i++) {
            expect(JSON.stringify(expectedValidMoves2).indexOf(JSON.stringify(validMoves2[i]))).not.toBe(-1)
        }
        for (let i = 0; i < validMoves3.length; i++) {
            expect(JSON.stringify(expectedValidMoves3).indexOf(JSON.stringify(validMoves3[i]))).not.toBe(-1)
        }
        for (let i = 0; i < validMoves4.length; i++) {
            expect(JSON.stringify(expectedValidMoves4).indexOf(JSON.stringify(validMoves4[i]))).not.toBe(-1)
        }
        for (let i = 0; i < validMoves5.length; i++) {
            expect(JSON.stringify(expectedValidMoves5).indexOf(JSON.stringify(validMoves5[i]))).not.toBe(-1)
        }
    })

})
