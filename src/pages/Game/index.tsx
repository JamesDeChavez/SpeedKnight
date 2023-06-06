import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import Board from '../../components/Board'
import './styles.css'
import { gsap } from 'gsap'

interface Props {
    root: React.MutableRefObject<null>
}

const Game: React.FC<Props> = ({ root }) => {
    const [gameActive, setGameActive] = useState(false)
    const [score, setScore] = useState(0)
    const [time, setTime] = useState(60)
    const timeRef = useRef<number>(0)
    const intervalRef = useRef<number>()

    useEffect(() => {
        timeRef.current = time
    }, [time])

    useLayoutEffect(() => {
        let gsapContext = gsap.context(() => {
        //Entrance animation on render
        gsap.fromTo(`.${className}_score`, {duration: 0.5, x: '-100%'}, {x: 0})
        gsap.fromTo(`.${className}_time`, {duration: 0.5, x: '100%'}, {x: 0})
        gsap.fromTo(`.${className}_startButton`, {duration: 0.5, y: 150}, {y: 0})


        return () => gsapContext.revert()
        }, root)
    }, [])

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()    
        if (gameActive) {
        setGameActive(false)
        clearInterval(intervalRef.current)
        return
        }
        setTime(60)
        setScore(0)
        setGameActive(true)
        intervalRef.current = setInterval(() => {
        if (timeRef.current <= 0) {
            clearInterval(intervalRef.current)
            setGameActive(false) 
            return
        }
        setTime(time => time - 1)
        }, 1000)
        setGameActive(true)
    }

    const className = 'Game'
    return (
        <div className={className}>
            <div className={`${className}_scoreTimeContainer`}>
                <p className={`${className}_score`}>{`Score: ${score}`}</p>
                <p className={`${className}_time`}>{`Time: ${time}`}</p>
            </div>
            <Board setScore={setScore} gameActive={gameActive} root={root} />
            <div className={`${className}_buttonsContainer`}>
                <button className={`${className}_startButton`} onClick={handleButtonClick}>
                    {gameActive ? 'Quit Game' : 'Start Game'}
                </button>
            </div>
        </div>
    )
}

export default Game