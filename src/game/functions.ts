import { BoardSpace } from "../utils/interfaces"

const rows = [1, 2, 3, 4, 5, 6, 7, 8]
const columns = [1, 2, 3, 4, 5, 6, 7, 8]

export const createEmptyBoard = () => {
    const newBoard: BoardSpace[][] = []
    
    for (let i = 0; i < rows.length; i++) {
        const newRow = []
        for (let j = 0; j < columns.length; j++) {
            newRow.push({
                backgroundColor: (i + j) % 2 === 0 ? '#b58863' : '#f0d9b5',
                knightVisible: false,
                pawnVisible: false,
                validMove: false
            })
        }
        newBoard.push(newRow)
    }
    return newBoard
}

export const createBoard = () => {
    const newBoard: BoardSpace[][] = []
    const pawnStartingRow = Math.floor(Math.random() * 6) + 1 
    const pawnStartingCol = Math.floor(Math.random() * 8) + 1 
    const validMoves = determineValidMoves(7, 6)
    
    for (let i = 0; i < rows.length; i++) {
        const newRow = []
        for (let j = 0; j < columns.length; j++) {
            newRow.push({
                backgroundColor: (i + j) % 2 === 0 ? '#b58863' : '#f0d9b5',
                knightVisible: (rows[i] === 8 && columns[j] === 7) ? true : false,
                pawnVisible: (rows[i] === pawnStartingRow && columns[j] === pawnStartingCol) ? true : false,
                validMove: false
            })
        }
        newBoard.push(newRow)
    }

    validMoves.forEach(move => {
        newBoard[move[0]][move[1]].validMove = true
    })

    return newBoard
}

export const determineValidMoves = (row: number, col: number) => {
    const validMoves: [number, number][] = []
    if (row >= 2) {
        if (col > 0) validMoves.push([row - 2, col - 1])
        if (col < 7) validMoves.push([row - 2, col + 1])
    }
    if (row <= 5) {
        if (col > 0) validMoves.push([row + 2, col - 1])
        if (col < 7) validMoves.push([row + 2, col + 1])
    }
    if (col >= 2) {
        if (row > 0) validMoves.push([row - 1, col - 2])
        if (row < 7) validMoves.push([row + 1, col - 2])
    }
    if (col <= 5) {
        if (row > 0) validMoves.push([row - 1, col + 2])
        if (row < 7) validMoves.push([row + 1, col + 2])
    }
    return validMoves
}

export const determineNewPawnPosition = (excludePosition: [number, number]) => {
    const newPawnRow = Math.floor(Math.random() * 8)
    const newPawnCol = Math.floor(Math.random() * 8)
    return (newPawnRow === excludePosition[0] && newPawnCol === excludePosition[1] && (excludePosition[0] === 0 && excludePosition[1] === 0) ) ? [7, 7] 
        :  (newPawnRow === excludePosition[0] && newPawnCol === excludePosition[1] ) ? [0, 0]
        : [newPawnRow, newPawnCol]
}
