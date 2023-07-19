import { Audit, BoardSpace, WastedMoves } from "../utils/interfaces"

const rows = [0, 1, 2, 3, 4, 5, 6, 7]
const columns = [0, 1, 2, 3, 4, 5, 6, 7]

const isValidMove = (x: number, y: number) => {
    if (x < 0 || x > 7 || y < 0 || y > 7) return false
    return true;
}

export const createEmptyBoard = () => {
    const newBoard: BoardSpace[][] = []    
    for (let i = 0; i < rows.length; i++) {
        const newRow = []
        for (let j = 0; j < columns.length; j++) {
            newRow.push({
                backgroundColor: (i + j) % 2 === 0 
                    ? '#f0d9b5' : '#b58863',
                knightVisible: false,
                pawnVisible: false,
                validMove: false
            })
        }
        newBoard.push(newRow)
    }
    return newBoard
}

export const determinePawnStart = () => {
    return {
        pawnRow: Math.floor(Math.random() * 5),
        pawnCol: Math.floor(Math.random() * 7)
    }
}

export const createBoard = (pawnRow: number, pawnCol: number, knightRow: number, knightCol: number, clickOn: boolean) => {
    const newBoard: BoardSpace[][] = []
    
    for (let i = 0; i < rows.length; i++) {
        const newRow = []
        for (let j = 0; j < columns.length; j++) {
            newRow.push({
                backgroundColor: (i + j) % 2 === 0 
                ? '#f0d9b5' : '#b58863',
                knightVisible: (i === knightRow && j === knightCol) 
                ? true : false,
                pawnVisible: (i === pawnRow && j === pawnCol) && (`${pawnRow}${pawnCol}` !== `${knightRow}${knightCol}`)
                ? true : false,
                validMove: false
            })
        }
        newBoard.push(newRow)
    }
    
    if(clickOn) {
        const validMoves = determineValidMoves(knightRow, knightCol)
        validMoves.forEach(move => {
            newBoard[move[0]][move[1]].validMove = true
        })
    }

    return newBoard
}

export const determineValidMoves = (row: number, col: number) => {
    const dx = [2, 2, -2, -2, 1, 1, -1, -1]
    const dy = [1, -1, 1, -1, 2, -2, 2, -2]
    const validMoves: [number, number][] = []

    for (let i = 0; i < dx.length; i++) {
        const newRow = row + dx[i]
        const newCol = col + dy[i]
        if (isValidMove(newRow, newCol)) {
            validMoves.push([newRow, newCol])
        }
    }
    return validMoves
}

export const determineNewPawnPosition = (excludePosition: [number, number]) => {
    const newPawnRow = Math.floor(Math.random() * 7)
    const newPawnCol = Math.floor(Math.random() * 7)
    return (newPawnRow === excludePosition[0] 
        && newPawnCol === excludePosition[1] 
        && (excludePosition[0] === 0 && excludePosition[1] === 0) 
    ) ? [7, 7] 
        : (newPawnRow === excludePosition[0] && newPawnCol === excludePosition[1] ) 
            ? [0, 0]
            : [newPawnRow, newPawnCol]
}

export const calcBestPath = (knightRow: number, knightCol: number, pawnRow: number, pawnCol: number) => {
    const dx = [2, 2, -2, -2, 1, 1, -1, -1]
    const dy = [1, -1, 1, -1, 2, -2, 2, -2]
    const queue: [number, number][] = [[knightRow, knightCol]]
    const moves = new Array(8).fill(0).map(() => new Array(8).fill(0))
    const visited = new Array(8).fill(0).map(() => new Array(8).fill(false))
    visited[knightRow][knightCol] = true
        
    while (queue.length > 0) {
        const currentSpace = queue.shift()
        const x = currentSpace ? currentSpace[0] : 0
        const y = currentSpace ? currentSpace[1] : 0

        if (x === pawnRow && y === pawnCol) return moves[x][y]
        
        for (let i = 0; i < 8; i++) {
            const newX = x + dx[i]
            const newY = y + dy[i]            
            if (isValidMove(newX, newY) && !visited[newX][newY]) {
                queue.push([newX, newY])
                visited[newX][newY] = true
                moves[newX][newY] = moves[x][y] + 1
            }            
        }
    }
    return -1
}

export const createWastedMovesAnalysis = (audit: Audit[]) => {
    const row = [8, 7, 6, 5, 4, 3, 2, 1]
    const col = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    if (audit[audit.length - 1].wastedMoves === 0) return []
    const wastedMovesAnalysis: WastedMoves[] = []

    let currIdx = 1
    let startOfPath = 0
    let endOfPath = 0
    let pawnPosition = ''
    let knightPosition = ''
    let knightMovement = []

    while (currIdx < audit.length) {
        if (audit[currIdx].currPath === 0 && audit[currIdx - 1].currPath > audit[currIdx - 1].bestPath) {
            pawnPosition = `${col[audit[currIdx].col]}${row[audit[currIdx].row]}`
            startOfPath = currIdx - 1 - audit[currIdx - 1].currPath
            endOfPath = currIdx
            knightPosition = `${col[audit[startOfPath].col]}${row[audit[startOfPath].row]}`
            for (let i = startOfPath; i <= endOfPath; i++) {
                knightMovement.push(`${col[audit[i].col]}${row[audit[i].row]}`)
            }
            wastedMovesAnalysis.push({
                pawn: pawnPosition,
                knight: knightPosition,
                userMoves: knightMovement,
                bestPath: audit[currIdx - 1].bestPath,
                userPath: knightMovement.length - 1
            })
            currIdx = endOfPath
            pawnPosition = ''
            knightMovement = []
        }
        currIdx++
    }
    return wastedMovesAnalysis
}

export const stringToRowCol = (str: string) => {
    const strToRow: any = {
        8: 0,
        7: 1,
        6: 2,
        5: 3,
        4: 4,
        3: 5,
        2: 6,
        1: 7
    }
    const strToCol: any = {
        'a': 0,
        'b': 1,
        'c': 2,
        'd': 3,
        'e': 4,
        'f': 5,
        'g': 6,
        'h': 7
    }

    return {
        row: strToRow[Number(str[1])],
        col: strToCol[str[0]]
    }
}


