import classNames from 'classnames'
import './styles.css'
import ArrowLeftSVG from '../ArrowLeftSVG'
import ArrowRightSVG from '../ArrowRightSVG'
import React, { useContext } from 'react'
import { BoardSpace, WastedMoves } from '../../utils/interfaces'
import { createBoard, stringToRowCol } from '../../game/functions'
import GlobalContext from '../../utils/GlobalContext'

interface Props {
    gameActive: boolean,
    wastedMovesIdx: number,
    selectedWastedMove: WastedMoves,
    setBoard: React.Dispatch<React.SetStateAction<BoardSpace[][]>>,
    setWastedMovesIdx: React.Dispatch<React.SetStateAction<number>>
}

const WastedMovesButtons: React.FC<Props> = ({ gameActive, wastedMovesIdx, selectedWastedMove, setBoard, setWastedMovesIdx}) => {
    const { darkMode } = useContext(GlobalContext)

    const handleArrowClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, direction: string) => {
        e.preventDefault()
        if (gameActive || !selectedWastedMove) return
        if (direction === 'right' && wastedMovesIdx < selectedWastedMove.userMoves.length - 1) {
            const { row: pawnRow, col: pawnCol } = stringToRowCol(selectedWastedMove.pawn)
            const { row: knightRow, col: knightCol } = stringToRowCol(selectedWastedMove.userMoves[wastedMovesIdx + 1])
            const newBoard = createBoard(pawnRow, pawnCol, knightRow, knightCol, false)
            setBoard(newBoard)
            setWastedMovesIdx(wastedMovesIdx + 1)
        }
        if (direction === 'left' && wastedMovesIdx > 0) {
            const { row: pawnRow, col: pawnCol } = stringToRowCol(selectedWastedMove.pawn)
            const { row: knightRow, col: knightCol } = stringToRowCol(selectedWastedMove.userMoves[wastedMovesIdx - 1])
            const newBoard = createBoard(pawnRow, pawnCol, knightRow, knightCol, false)
            setBoard(newBoard)
            setWastedMovesIdx(wastedMovesIdx - 1)
        }
    }

    const className = 'WastedMovesButtons'
    return (
        <div className={classNames(className, darkMode && `${className}_darkMode`)}>
            <p className={`${className}_wastedMovesButtonText`}>Your Moves</p>
            <button 
                className={classNames(
                    `${className}_wastedMovesButton`, 
                    wastedMovesIdx === 0 && `${className}_buttonDisabled`)
                } 
                onClick={(e) => handleArrowClick(e, 'left')}
            >
                <ArrowLeftSVG />
            </button>
            <button 
                className={classNames(
                    `${className}_wastedMovesButton`,
                    wastedMovesIdx >= selectedWastedMove.userMoves.length - 1 && `${className}_buttonDisabled`
                )} 
                onClick={(e) => handleArrowClick(e, 'right')}
            >
                <ArrowRightSVG />
            </button>
        </div>
    )
}

export default WastedMovesButtons