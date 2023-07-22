import { determineNewPawnPosition } from "../game/functions"

describe("determineNewPawnPosition", () => {
    it('should return a valid new pawn position', () => {
        const pawnPosition1 = determineNewPawnPosition([0, 0])
        const pawnPosition2 = determineNewPawnPosition([7, 7])
        const pawnPosition3 = determineNewPawnPosition([3, 4])
        expect(pawnPosition1[0]).toBeGreaterThanOrEqual(0)
        expect(pawnPosition1[0]).toBeLessThanOrEqual(7)
        expect(pawnPosition1[1]).toBeGreaterThanOrEqual(0)
        expect(pawnPosition1[1]).toBeLessThanOrEqual(7)
        expect(JSON.stringify(pawnPosition1)).not.toBe(JSON.stringify([0, 0]))
        expect(pawnPosition2[0]).toBeGreaterThanOrEqual(0)
        expect(pawnPosition2[0]).toBeLessThanOrEqual(7)
        expect(pawnPosition2[1]).toBeGreaterThanOrEqual(0)
        expect(pawnPosition2[1]).toBeLessThanOrEqual(7)
        expect(JSON.stringify(pawnPosition2)).not.toBe(JSON.stringify([7, 7]))
        expect(pawnPosition3[0]).toBeGreaterThanOrEqual(0)
        expect(pawnPosition3[0]).toBeLessThanOrEqual(7)
        expect(pawnPosition3[1]).toBeGreaterThanOrEqual(0)
        expect(pawnPosition3[1]).toBeLessThanOrEqual(7)
        expect(JSON.stringify(pawnPosition3)).not.toBe(JSON.stringify([3, 4]))
    })
})
