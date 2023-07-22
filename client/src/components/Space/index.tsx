import { useContext } from 'react'
import KnightSVG from "../Knight/KnightSVG"
import PawnSVG from "../Pawn/PawnSVG"
import { BoardSpace } from "../../utils/interfaces"
import { calcBestPath, determineNewPawnPosition, determineValidMoves } from '../../game/functions'
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
    setValidMoves: React.Dispatch<React.SetStateAction<[number, number][]>>
}

const Space: React.FC<Props> = ({ space, row, col, board, setBoard, knightPosition, setKnightPosition, validMoves, setValidMoves }) => {
    const { darkMode } = useContext(GlobalContext)
    const { soundOn, setOptionsVisible, markersOn, score, setScore, bestPath, setBestPath, currPath, setCurrPath, wastedMoves, setWastedMoves, setBestPathTotal, setUserPathTotal, audit, setAudit } = useContext(GameContext)

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        if (!space.validMove) return
        setOptionsVisible(false)
        const newBoard = [...board]
        const audio = space.pawnVisible ? new Audio(captureAudio) : new Audio(placeAudio)
        audio.volume = 0.2

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

        //Update Wasted Moves Metric, if applicable
        const newWastedMoves = currPath >= bestPath ? wastedMoves + 1 : wastedMoves
        if (currPath >= bestPath) setWastedMoves(newWastedMoves)        

        //Update Pawn Position and related metrics, if applicable
        if (space.pawnVisible) {
            const newPawnPosition = determineNewPawnPosition([row, col])
            const newBestPath = calcBestPath(row, col, newPawnPosition[0], newPawnPosition[1])
            
            newBoard[row][col].pawnVisible = false
            newBoard[newPawnPosition[0]][newPawnPosition[1]].pawnVisible = true
            
            setScore(prevState => prevState + 1)
            setBestPathTotal(prevState => prevState + bestPath)
            setUserPathTotal(prevState => prevState + currPath + 1)
            setBestPath(newBestPath)
            setCurrPath(0)
            const newAudit = [...audit, {
                pawnRow: newPawnPosition[0],
                pawnCol: newPawnPosition[1],
                knightRow: row, knightCol: col,
                row, col,
                score: score + 1, 
                wastedMoves: newWastedMoves,
                bestPath: newBestPath,
                currPath: 0,
                board: JSON.parse(JSON.stringify(newBoard))
            }]
            setAudit(newAudit)      
        } else {
            setCurrPath(prevState => prevState + 1)
            const newAudit = [...audit, {
                pawnRow: audit[audit.length - 1].pawnRow,
                pawnCol: audit[audit.length - 1].pawnCol,
                knightRow: row, knightCol: col,
                row, col,
                score: score,
                wastedMoves: newWastedMoves,
                bestPath: audit[audit.length - 1].bestPath,
                currPath: currPath + 1,
                board: JSON.parse(JSON.stringify(newBoard))
            }]
            setAudit(newAudit)        
        }

        //Update State and play audio
        setBoard(newBoard)
        setKnightPosition([row, col])
        setValidMoves(newValidMoves)
        soundOn && audio.play()
    }

    const className = 'Space'
    return (
        <div className={classNames(className, 
                space.validMove && className + '_validMove' 
            )} 
            id={`Row_${row}-Col_${col}`} 
            style={{ backgroundColor: (space.validMove && markersOn) ? '#cb3535' 
                : (darkMode && space.backgroundColor === '#b58863') ? '#769656'
                : space.backgroundColor
            }}
            onMouseDown={handleMouseDown}
            data-testid="BoardSpace"
        >
            {space.knightVisible && <KnightSVG />}
            {space.pawnVisible && <PawnSVG />}
        </div>
    )
}

export default Space