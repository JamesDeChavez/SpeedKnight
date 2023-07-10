import { useState, useEffect, useLayoutEffect } from 'react'
import { BoardSpace } from '../../utils/interfaces'
import { createBoard, createEmptyBoard } from '../../game/functions'
import Space from '../Space'
import { gsap } from 'gsap'
import './styles.css'

interface Props {
    setScore: React.Dispatch<React.SetStateAction<number>>,
    gameActive: boolean,
    root: React.MutableRefObject<null>
}

const Board: React.FC<Props> = ({setScore, gameActive, root}) => {    
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
        setKnightPosition([7, 6])
        setValidMoves([
            [6, 4], [5, 5], [5, 7]
        ])
        setBoard(newBoard)
    }, [gameActive])

    useLayoutEffect(() => {
        let gsapContext = gsap.context(() => {
            gsap.fromTo(`.${className}`, {duration: 0.5, opacity: 0}, {opacity: 1})
            return () => gsapContext.revert()
        }, root)
    }, [])

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