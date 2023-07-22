import { stringToRowCol } from "../game/functions"

describe("stringToRowCol", () => {
    it("should return correct row and column for given input", () => {
        const result1 = stringToRowCol("a1")
        const result2 = stringToRowCol("b2")
        const result3 = stringToRowCol("c3")
        const result4 = stringToRowCol("g7")
        const result5 = stringToRowCol("f8")
        expect(result1).toEqual({ row: 7, col: 0 })
        expect(result2).toEqual({ row: 6, col: 1 })
        expect(result3).toEqual({ row: 5, col: 2 })
        expect(result4).toEqual({ row: 1, col: 6 })
        expect(result5).toEqual({ row: 0, col: 5 })
    })
})
