import { useContext } from 'react'
import KnightSVG from "../Knight/KnightSVG"
import PawnSVG from "../Pawn/PawnSVG"
import { BoardSpace } from "../../utils/interfaces"
import { determineNewPawnPosition, determineValidMoves } from '../../game/functions'
import placeAudio from '../../assets/piece-placement.mp3'
import captureAudio from '../../assets/piece-capture.mp3'
import GlobalContext from '../../utils/GlobalContext'
import GameContext from '../../utils/GameContext'
import classNames from 'classnames'
import './styles.css'

interface Props {
    space: BoardSpace,
    row: number,
    col: number,
    board: BoardSpace[][],
    setBoard: React.Dispatch<React.SetStateAction<BoardSpace[][]>>,
    knightPosition: [number, number],
    setKnightPosition: React.Dispatch<React.SetStateAction<[number, number]>>,
    validMoves: [number, number][],
    setValidMoves: React.Dispatch<React.SetStateAction<[number, number][]>>,
    setScore: React.Dispatch<React.SetStateAction<number>>
}

const Space: React.FC<Props> = ({ space, row, col, board, setBoard, knightPosition, setKnightPosition, validMoves, setValidMoves, setScore }) => {
    const { darkMode } = useContext(GlobalContext)
    const { soundOn, setOptionsVisible, markersOn } = useContext(GameContext)

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        if (!space.validMove) return
        setOptionsVisible(false)
        const newBoard = [...board]
        const audio = space.pawnVisible ? new Audio(captureAudio) : new Audio(placeAudio)
        audio.volume = 0.2
        
        //Update Pawn Position, if applicable
        if (space.pawnVisible) {
            newBoard[row][col].pawnVisible = false
            const newPawnPosition = determineNewPawnPosition([row, col])
            newBoard[newPawnPosition[0]][newPawnPosition[1]].pawnVisible = true
            setScore(score => score + 1)
        }

        //Update Knight Position
        newBoard[row][col].knightVisible = true
        newBoard[knightPosition[0]][knightPosition[1]].knightVisible = false
        
        //Update Valid Move Positions
        validMoves.forEach(move => {
            newBoard[move[0]][move[1]].validMove = false
        })
        const newValidMoves = determineValidMoves(row, col)
        newValidMoves.forEach(move => {
            newBoard[move[0]][move[1]].validMove = true
        })

        //Update State and play audio
        setBoard(newBoard)
        setKnightPosition([row, col])
        setValidMoves(newValidMoves)
        soundOn && audio.play()
    }

    const className = 'Space'
    return (
        <div 
            className={classNames(className, {
                [className + '_validMove']: space.validMove,
            })} 
            id={`Row_${row}-Col_${col}`} 
            style={{
                backgroundColor: (space.validMove && markersOn) ? '#cb3535' 
                    : (darkMode && space.backgroundColor === '#b58863') ? '#769656'
                    : space.backgroundColor
            }}
            onMouseDown={handleMouseDown}
        >
            {space.knightVisible && <KnightSVG />}
            {space.pawnVisible && <PawnSVG />}
        </div>
    )
}

export default Space