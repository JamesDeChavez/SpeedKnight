import classNames from 'classnames'
import React, { useContext, useState } from 'react'
import './styles.css'
import GlobalContext from '../../utils/GlobalContext'

interface Props {
    soundOn: boolean, setSoundOn: React.Dispatch<React.SetStateAction<boolean>>,
    markersOn: boolean, setMarkersOn: React.Dispatch<React.SetStateAction<boolean>>
    optionsVisible: boolean, setOptionsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const GameOptions: React.FC<Props> = ({ soundOn, markersOn, setSoundOn, setMarkersOn, optionsVisible, setOptionsVisible }) => {
    const { darkMode } = useContext(GlobalContext)

    const handleSoundClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, action: string) => {
        e.preventDefault()
        if (action === 'ON') {
            setSoundOn(true)
            localStorage.setItem('soundOn', 'true')
        } else {
            setSoundOn(false)
            localStorage.setItem('soundOn', 'false')
        }
    }

    const handleMarkersClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, action: string) => {
        e.preventDefault()
        if (action === 'ON') {
            setMarkersOn(true)
            localStorage.setItem('markersOn', 'true')
        } else {
            setMarkersOn(false)
            localStorage.setItem('markersOn', 'false')
        }    
    }

    const className = "GameOptions"
    return (
        <div className={classNames(className, darkMode && `${className}_darkMode`)}>
            <div className={`${className}_gameOptionsToggleContainer`} onClick={() => setOptionsVisible(!optionsVisible)}>
                <p className={`${className}_gameOptionsToggleText`}>Options</p>
                <svg className={`${className}_toggleSVG`} viewBox="0 0 100 100" >
                    <line x1="5" y1="50" x2="95" y2="50" strokeWidth={10}/>
                    <line x1="50" y1="5" x2="50" y2="95" strokeWidth={10} style={{ display: optionsVisible ? 'none' : 'inherit' }}/>
                </svg> 
            </div>
            <div className={`${className}_options`} style={{ display: optionsVisible ? 'inherit' : 'none' }}>
                <div className={`${className}_optionContainer`}>
                    <p>Sound</p>
                    <div className={`${className}_optionButtonsContainer`}>
                        <button className={classNames(`${className}_optionButton`, soundOn && `${className}_buttonActive`)} onClick={(e) => handleSoundClick(e, 'ON')}>On</button>
                        <button className={classNames(`${className}_optionButton`, !soundOn && `${className}_buttonActive`)} onClick={(e) => handleSoundClick(e, 'OFF')}>Off</button>
                    </div>
                </div>
                <div className={`${className}_optionContainer`}>
                    <p>Red Markers</p>
                    <div className={`${className}_optionButtonsContainer`}>
                        <button className={classNames(`${className}_optionButton`, markersOn && `${className}_buttonActive`)} onClick={(e) => handleMarkersClick(e, 'ON')}>On</button>
                        <button className={classNames(`${className}_optionButton`, !markersOn && `${className}_buttonActive`)} onClick={(e) => handleMarkersClick(e, 'OFF')}>Off</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameOptions