import React, { useState, useRef, useEffect } from 'react'
import Board from './components/Board'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [gameActive, setGameActive] = useState(false)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(60)
  const timeRef = useRef<number>(0)
  const intervalRef = useRef<number>()

  useEffect(() => {
    timeRef.current = time
  }, [time])

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

  const className = 'App'
  return (
    <div className={className}>
      <Navbar />
      <div className={`${className}_main`}>
        <div className={`${className}_scoreTimeContainer`}>
          <p>{`Score: ${score}`}</p>
          <p>{`Time: ${time}`}</p>
        </div>
        <Board setScore={setScore} gameActive={gameActive} />
        <div className={`${className}_buttonsContainer`}>
          <button className={`${className}_startButton`} onClick={handleButtonClick}>
            {gameActive ? 'Quit Game' : 'Start Game'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
