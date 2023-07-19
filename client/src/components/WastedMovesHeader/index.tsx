import React, { useContext } from 'react'
import { WastedMoves } from '../../utils/interfaces'
import './styles.css'
import GlobalContext from '../../utils/GlobalContext'
import classNames from 'classnames'

interface Props {
    selectedWastedMove: WastedMoves
}

const WastedMovesHeader: React.FC<Props> = ({ selectedWastedMove }) => {
    const { darkMode } = useContext(GlobalContext)
    const className = 'WastedMovesHeader'
    return (
        <div className={classNames(className, darkMode && `${className}_darkMode`)}>
            <div className={`${className}_headerPositionsContainer`}>
                <p>{`Start: ${selectedWastedMove.knight}`}</p>
                <p>{`End: ${selectedWastedMove.pawn}`}</p>
            </div>
            <div className={`${className}_headerPathsContainer`}>
                <p>{`Best Path: ${selectedWastedMove.bestPath}`}</p>
                <p>{`Your Path: ${selectedWastedMove.userPath}`}</p>
            </div>
        </div>
    )
}

export default WastedMovesHeader