import { calcBestPath } from "../game/functions"

describe("calcBestPath", () => {
    it('should return the best path', () => {
        const bestPath1 = calcBestPath(0, 5, 6, 6)
        const bestPath2 = calcBestPath(6, 6, 6, 1)
        const bestPath3 = calcBestPath(2, 2, 0, 5)
        const bestPath4 = calcBestPath(5, 0, 5, 3)
        const bestPath5 = calcBestPath(0, 5, 5, 0)

        expect(bestPath1).toEqual(3)
        expect(bestPath2).toEqual(3)
        expect(bestPath3).toEqual(3)
        expect(bestPath4).toEqual(3)
        expect(bestPath5).toEqual(4)    
    })
})
