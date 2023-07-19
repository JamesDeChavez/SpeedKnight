import { useState, useEffect, useLayoutEffect, useContext } from 'react'
import { calcBestPath, createBoard, createEmptyBoard, determinePawnStart } from '../../game/functions'
import Space from '../Space'
import { gsap } from 'gsap'
import './styles.css'
import GameContext from '../../utils/GameContext'
import { BoardSpace } from '../../utils/interfaces'

interface Props {
    gameActive: boolean,
    root: React.MutableRefObject<null>,
    board: BoardSpace[][],
    setBoard: React.Dispatch<React.SetStateAction<BoardSpace[][]>>
}

const Board: React.FC<Props> = ({ gameActive, root, board, setBoard }) => {
    const { setBestPath, setAudit } = useContext(GameContext)
    const [knightPosition, setKnightPosition] = useState<[number, number]>([0, 0])
    const [validMoves, setValidMoves] = useState<[number, number][]>([])

    useEffect(() => {
        if (!gameActive) {
            const emptyBoard = createEmptyBoard()
            setBoard(emptyBoard)
            return
        }
        const { pawnRow, pawnCol } = determinePawnStart()
        const newBoard = createBoard(pawnRow, pawnCol, 7, 6, true)
        setKnightPosition([7, 6])
        const initBestPath = calcBestPath(7, 6, pawnRow, pawnCol)
        setBestPath(initBestPath)
        setValidMoves([ [6, 4], [5, 5], [5, 7] ])
        setBoard(newBoard)
        setAudit([{
            pawnRow, pawnCol,
            knightRow: 7, knightCol: 6,
            row: 7, col: 6,
            score: 0, wastedMoves: 0,
            bestPath: initBestPath, currPath: 0,
            board: JSON.parse(JSON.stringify(newBoard))
        }])
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
                    />
                })
            })}
        </div>
    )
}

export default Board;