import { useState, useEffect } from 'react'
import { BoardSpace } from '../../utils/interfaces'
import { createBoard, createEmptyBoard } from '../../game/functions'
import Space from '../Space'
import './styles.css'

interface Props {
    setScore: React.Dispatch<React.SetStateAction<number>>,
    gameActive: boolean
}

const Board: React.FC<Props> = ({setScore, gameActive}) => {    
    const [board, setBoard] = useState<BoardSpace[][]>([])
    const [knightPosition, setKnightPosition] = useState<[number, number]>([0, 0])
    const [validMoves, setValidMoves] = useState<[number, number][]>([])

    useEffect(() => {
        if (!gameActive) {
            const emptyBoard = createEmptyBoard()
            setBoard(emptyBoard)
            return
        }
        const newBoard = createBoard()
        setKnightPosition([7, 5])
        setValidMoves([
            [6, 3], [6, 7], [5, 4], [5, 6]
        ])
        setBoard(newBoard)
    }, [gameActive])

    const className = 'Board'
    return (
        <div className={className}>
            {board.map((row, i) => {
                return row.map((space, j) => {
                    return <Space 
                        key={`Row_${i}-Col_${j}`} 
                        row={i} 
                        col={j} 
                        space={space}
                        board={board}
                        setBoard={setBoard}
                        knightPosition={knightPosition}
                        setKnightPosition={setKnightPosition}
                        validMoves={validMoves}
                        setValidMoves={setValidMoves}
                        setScore={setScore}
                    />
                })
            })}
        </div>
    )
}

export default Board;