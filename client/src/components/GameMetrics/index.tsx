import React, { useContext } from 'react'
import GlobalContext from '../../utils/GlobalContext'
import classNames from 'classnames'
import './styles.css'

interface Props {
    bestPath : number,
    currPath : number,
    wastedMoves : number
}

const GameMetrics: React.FC<Props> = ({ bestPath, currPath, wastedMoves }) => {
    const { darkMode } = useContext(GlobalContext)

    const className = 'GameMetrics'
    return (
        <div className={classNames(className, darkMode && `${className}_darkMode`)}>
            <div className={`${className}_pathsContainer`}>
                <p className={`${className}_bestPath`} >{`Best Path: ${bestPath}`}</p>
                <p className={`${className}_currPath`} >{`Current Path: ${currPath}`}</p>
            </div>
            <p className={`${className}_wasted`} >{`Wasted: ${wastedMoves}`}</p>
        </div>
    )
}

export default GameMetrics