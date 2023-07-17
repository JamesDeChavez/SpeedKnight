export interface BoardSpace {
    backgroundColor: string,
    knightVisible: boolean,
    pawnVisible: boolean,
    validMove: boolean
}

export interface Audit {
    pawnRow: number,
    pawnCol: number,
    knightRow: number,
    knightCol: number,
    row: number,
    col: number,
    score: number,
    bestPath: number,
    currPath: number,
    wastedMoves: number,
    board: BoardSpace[][]
}