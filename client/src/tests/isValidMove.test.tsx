import { isValidMove } from "../game/functions";

describe("isValidMove", () => {
    it('should return true for a valid move', () => {
        expect(isValidMove(0, 0)).toBeTruthy()
        expect(isValidMove(1, 3)).toBeTruthy()
        expect(isValidMove(4, 7)).toBeTruthy()
        expect(isValidMove(6, 1)).toBeTruthy()
    })
    it('should return false for an invalid move', () => {
        expect(isValidMove(1, 8)).toBeFalsy()
        expect(isValidMove(-1, 4)).toBeFalsy()
        expect(isValidMove(10, 10)).toBeFalsy()
        expect(isValidMove(0, 8)).toBeFalsy()
    })
})