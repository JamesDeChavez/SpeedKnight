import React, { useContext } from 'react'
import { BoardSpace, WastedMoves } from '../../utils/interfaces'
import { createBoard, stringToRowCol } from '../../game/functions'
import GlobalContext from '../../utils/GlobalContext'
import classNames from 'classnames'
import './styles.css'

interface Props {
    gameActive: boolean,
    wastedMovesVisible: boolean,
    setWastedMovesVisible: React.Dispatch<React.SetStateAction<boolean>>,
    wastedMovesData: WastedMoves[],
    setBoard: React.Dispatch<React.SetStateAction<BoardSpace[][]>>,
    selectedWastedMove: WastedMoves | null,
    setSelectedWastedMove: React.Dispatch<React.SetStateAction<WastedMoves | null>>,
    setWastedMovesIdx: React.Dispatch<React.SetStateAction<number>>
}

const WastedMoveDetails: React.FC<Props> = ({ gameActive, wastedMovesVisible, setWastedMovesVisible, wastedMovesData, setBoard, selectedWastedMove, setSelectedWastedMove, setWastedMovesIdx }) => {
    const { darkMode } = useContext(GlobalContext)

    const handleWastedMoveClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, move: WastedMoves) => {
        e.preventDefault()
        if (gameActive || !move) return
        const { row: pawnRow, col: pawnCol } = stringToRowCol(move.pawn)
        const { row: knightRow, col: knightCol } = stringToRowCol(move.knight)
        const newBoard = createBoard(pawnRow, pawnCol, knightRow, knightCol, false)
        setBoard(newBoard)
        setSelectedWastedMove(move)
        setWastedMovesIdx(0)
    }

    const className = 'WastedMoveDetails'
    return (
        <div className={classNames(className, darkMode && `${className}_darkMode`)}>
            <div className={`${className}_wastedMovesToggleContainer`} onClick={() => setWastedMovesVisible(prevState => !prevState)}>
                <p className={`${className}_wastedMovesToggleText`}>Wasted Moves Details</p>
                <svg className={`${className}_toggleSVG`} viewBox="0 0 100 100" >
                    <line x1="5" y1="50" x2="95" y2="50" strokeWidth={10}/>
                    <line x1="50" y1="5" x2="50" y2="95" strokeWidth={10} style={{ display: wastedMovesVisible ? 'none' : 'inherit' }}/>
                </svg> 
            </div>
            {wastedMovesData.length <= 0 
                ? <p  className={`${className}_wastedMoveText`} style={{ display: wastedMovesVisible ? 'inherit' : 'none' }}>Your inefficient moves will appear here for review</p>
                : <div className={`${className}_wastedMoves`} style={{ display: wastedMovesVisible ? 'inherit' : 'none' }}>
                        {wastedMovesData.map((move, idx) => {
                            return (
                            <button key={`wastedmove_${idx}`} className={classNames(`${className}_moveContainer`, selectedWastedMove === move && `${className}_selected`)} onClick={(e) => handleWastedMoveClick(e, move)} >
                                <div className={`${className}_moveSummary`}>
                                    <p className={`${className}_wastedMoveText`}>{`Knight: ${move.knight}`}</p>
                                    <p className={`${className}_wastedMoveText`}>{`Pawn: ${move.pawn}`}</p>
                                    <p className={`${className}_wastedMoveText`}>{`Best Path: ${move.bestPath}`}</p>
                                    <p className={`${className}_wastedMoveText`}>{`Your Path: ${move.userPath}`}</p>
                                </div>
                                <div className={`${className}_moveDetails`}>
                                    <p className={`${className}_wastedMoveText`}>{`Your Moves: ${move.userMoves.map(usermove => ` ${usermove}`)}`}</p>
                                </div>
                            </button>
                            )
                        })}
                </div>
            }
        </div>
    )
}

export default WastedMoveDetails