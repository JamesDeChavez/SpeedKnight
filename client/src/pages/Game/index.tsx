import React, { useState, useRef, useEffect, useLayoutEffect, useContext } from 'react'
import Board from '../../components/Board'
import GlobalContext from '../../utils/GlobalContext'
import PostGameModal from '../../components/PostGameModal'
import key from '../../config/config'
import GameContext from '../../utils/GameContext'
import { API, Auth } from 'aws-amplify'
import { Audit, WastedMoves, BoardSpace } from '../../utils/interfaces'
import { createWastedMovesAnalysis } from '../../game/functions'
import GameOptions from '../../components/GameOptions'
import WastedMovesHeader from '../../components/WastedMovesHeader'
import ScoreTimeHeader from '../../components/ScoreTimeHeader'
import WastedMovesButtons from '../../components/WastedMovesButtons'
import GameMetrics from '../../components/GameMetrics'
import WastedMoveDetails from '../../components/WastedMoveDetails'
import { gsap } from 'gsap'
import classNames from 'classnames'
import './styles.css'

interface Props {
    root: React.MutableRefObject<null>
}

const Game: React.FC<Props> = ({ root }) => {
    const { darkMode, userLoggedIn, userData  } = useContext(GlobalContext)
    const [board, setBoard] = useState<BoardSpace[][]>([])
    const [gameActive, setGameActive] = useState(false)
    const [score, setScore] = useState(0)
    const [time, setTime] = useState(60)
    const [userBest, setUserBest] = useState(0)
    const [userScoresTotal, setUserScoresTotal] = useState(0)
    const [userScoresCount, setUserScoresCount] = useState(1)
    const [globalBest, setGlobalBest] = useState(0)
    const [globalScoresTotal, setGlobalScoresTotal] = useState(0)
    const [globalScoresCount, setGlobalScoresCount] = useState(1)
    const [spinnersVisible, setSpinnersVisible] = useState({ user: false, global: false })
    const [modalVisible, setModalVisible] = useState(false)
    const [submitScoreData, setSubmitScoreData] = useState(null)
    const [optionsVisible, setOptionsVisible] = useState(false)
    const [soundOn, setSoundOn] = useState(true)
    const [markersOn, setMarkersOn] = useState(true)
    const [bestPath, setBestPath] = useState(0)
    const [currPath, setCurrPath] = useState(0)
    const [wastedMoves, setWastedMoves] = useState(0)
    const [bestPathTotal, setBestPathTotal] = useState(0)
    const [userPathTotal, setUserPathTotal] = useState(0)
    const [audit, setAudit] = useState<Audit[]>([])
    const [wastedMovesVisible, setWastedMovesVisible] = useState(false)
    const [wastedMovesData, setWastedMovesData] = useState<WastedMoves[]>([])
    const [selectedWastedMove, setSelectedWastedMove] = useState<WastedMoves | null>(null)
    const [wastedMovesIdx, setWastedMovesIdx] = useState(0)
    const timeRef = useRef<number>(0)
    const intervalRef = useRef<NodeJS.Timer>()
    const scoreRef = useRef<number>(score)
    const bestPathRef = useRef<number>(bestPath)
    const currPathRef = useRef<number>(currPath)
    const wastedMovesRef = useRef<number>(wastedMoves)
    const auditRef = useRef<Audit[]>(audit)

    useEffect(() => {
        const soundOnPref = localStorage.getItem('soundOn')
        const markersOnPref = localStorage.getItem('markersOn')
        setSoundOn(soundOnPref === 'true' ? true : false)
        setMarkersOn(markersOnPref === 'true' ? true : false)
    }, [])

    useEffect(() => { timeRef.current = time }, [time])

    useEffect(() => { scoreRef.current = score }, [score])

    useEffect(() => { bestPathRef.current = bestPath }, [bestPath])

    useEffect(() => { currPathRef.current = currPath }, [currPath])

    useEffect(() => { wastedMovesRef.current = wastedMoves }, [wastedMoves])

    useEffect(() => { auditRef.current = audit }, [audit])

    useEffect(() => {
        if (!submitScoreData) return
        const getUserMetrics = async () => {
            if (!userData) {
                setUserBest(Number(sessionStorage.getItem('bestScore')) || 0)
                setUserScoresTotal(Number(sessionStorage.getItem('scoresTotal')) || 0)
                setUserScoresCount(Number(sessionStorage.getItem('scoresCount')) || 1)
                setSpinnersVisible(prevState => ({ ...prevState, user: false }))
                return
            }            
            const apiName = 'SpeedKnightChallenge'
            const path = '/score/user'            
            const currentUserId = userData.attributes ? userData.attributes.sub : userData.signInUserSession.idToken.payload.sub
            const myInit: any = {
                queryStringParameters: { userId: currentUserId },
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json",
                    Authorization: `${(await Auth.currentSession()).getIdToken().getJwtToken()}`
                }
            }
            try {
                const response = await API.get(apiName, path, myInit)
                setUserBest(response.scoreMax)
                setUserScoresTotal(response.scoresTotal)
                setUserScoresCount(response.scoresCount > 0 ? response.scoresCount : 1)
                setSpinnersVisible(prevState => ({ ...prevState, user: false }))
            } catch (error) {
                console.log('error', error)
                setSpinnersVisible(prevState => ({ ...prevState, user: false }))
            }
        }
        
        const getGlobalMetrics = async () => {
            const apiName = 'SpeedKnightChallenge'
            const path = '/score/global'
            const myInit: any = { headers: { Accept: "*/*", "Content-Type": "application/json" } }
            try {
                const response = await API.get(apiName, path, myInit)
                setGlobalBest(response.scoreMax)
                setGlobalScoresTotal(response.scoresTotal)
                setGlobalScoresCount(response.scoresCount)
                setSpinnersVisible(prevState => ({ ...prevState, global: false }))
            } catch (error) {
                console.log('error', error)
                setSpinnersVisible(prevState => ({ ...prevState, global: false }))
            }
        }
        getUserMetrics()  
        getGlobalMetrics()
        setSubmitScoreData(null)
    }, [submitScoreData])

    useEffect(() => {
        if (timeRef.current > 0 || gameActive) return
        const submitScore = async () => {
            if (!userLoggedIn) {
                sessionStorage.setItem('scoresTotal', 
                    sessionStorage.getItem('scoresTotal') 
                        ? `${Number(sessionStorage.getItem('scoresTotal')) + scoreRef.current}` 
                        : `${scoreRef.current}`)
                sessionStorage.setItem('scoresCount', 
                    sessionStorage.getItem('scoresCount') 
                        ? `${Number(sessionStorage.getItem('scoresCount')) + 1}` 
                        : '1')
                sessionStorage.setItem('bestScore',
                    sessionStorage.getItem('bestScore')
                        ? `${Math.max(Number(sessionStorage.getItem('bestScore')), scoreRef.current)}`
                        : `${scoreRef.current}`)
            }            
            const apiName = 'SpeedKnightChallenge'
            const path = '/score'
            const currentUserId = userData 
                ? userData.attributes 
                    ? userData.attributes.sub 
                    : userData.signInUserSession.idToken.payload.sub
                : 'AnonymousUser' 
            const myInit: any = {
                body: {
                    userId: currentUserId,
                    score: scoreRef.current,
                    createdAt: new Date().getTime(),
                    key: key, 
                    aud: auditRef.current
                }, 
                headers: { Accept: "*/*", "Content-Type": "application/json" } 
            }
            try {
                const response = await API.post(apiName, path, myInit)
                setSubmitScoreData(response)
            } catch (error) {
                console.log(error)
            }
        }
        submitScore()
        
    }, [gameActive])

    useLayoutEffect(() => {
        let gsapContext = gsap.context(() => {
        //Entrance animation on render
        gsap.fromTo(`.${className}_score`, {duration: 0.5, x: '-100%'}, {x: 0})
        gsap.fromTo(`.${className}_time`, {duration: 0.5, x: '100%'}, {x: 0})
        gsap.fromTo(`.${className}_startButton`, {duration: 0.5, y: 150}, {y: 0})

        return () => gsapContext.revert()
        }, root)
    }, [])

    const handleStartClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()    
        if (gameActive) {
            setGameActive(false)
            setBestPath(0)
            setCurrPath(0)
            clearInterval(intervalRef.current)
            setWastedMovesData(createWastedMovesAnalysis(auditRef.current))
            setWastedMovesVisible(true)
            setSelectedWastedMove(null)
            setWastedMovesIdx(0)
            return
        }
        setTime(60)
        setScore(0)
        setCurrPath(0)
        setWastedMoves(0)
        setBestPathTotal(0)
        setUserPathTotal(0)
        setGameActive(true)
        setOptionsVisible(false)
        setWastedMovesData([])
        setWastedMovesVisible(false)
        setSelectedWastedMove(null)
        setWastedMovesIdx(0)
        intervalRef.current = setInterval(() => {
            if (timeRef.current <= 0) {
                clearInterval(intervalRef.current)
                setGameActive(false)
                setModalVisible(true)
                setWastedMovesData(createWastedMovesAnalysis(auditRef.current))
                setWastedMovesVisible(true)
                setSpinnersVisible({ user: true, global: true })
                return
            }
            setTime(time => time - 1)
        }, 1000)
        setGameActive(true)
    }

    const className = 'Game'
    return (
        <GameContext.Provider value={{ soundOn, setOptionsVisible, markersOn, score, setScore, bestPath, setBestPath, currPath, setCurrPath, wastedMoves, setWastedMoves, setBestPathTotal, setUserPathTotal, audit, setAudit }}>
            <div className={classNames(className, darkMode && className + '_darkMode')}>
                <div className={`${className}_instructionsContainer`}>
                    <p className={`${className}_instructions`}><strong>Game Rules: </strong>Capture as many pawns as you can in 60 seconds using only one knight piece.</p>
                    <GameOptions 
                        soundOn={soundOn} setSoundOn={setSoundOn} 
                        markersOn={markersOn} setMarkersOn={setMarkersOn} 
                        optionsVisible={optionsVisible} setOptionsVisible={setOptionsVisible} 
                    />
                </div>
                <div className={`${className}_gameAreaContainer`}>
                    {selectedWastedMove ?
                        <WastedMovesHeader selectedWastedMove={selectedWastedMove} />
                    :    
                        <ScoreTimeHeader score={score} time={time} />
                    }
                    <Board gameActive={gameActive} root={root} board={board} setBoard={setBoard} />
                    {selectedWastedMove ? 
                        <WastedMovesButtons gameActive={gameActive} wastedMovesIdx={wastedMovesIdx} setWastedMovesIdx={setWastedMovesIdx} selectedWastedMove={selectedWastedMove} setBoard={setBoard} />
                    :                        
                        <GameMetrics bestPath={bestPath} currPath={currPath} wastedMoves={wastedMoves} />
                    }
                </div>
                <WastedMoveDetails 
                    gameActive={gameActive} 
                    wastedMovesVisible={wastedMovesVisible} 
                    setWastedMovesVisible={setWastedMovesVisible}
                    wastedMovesData={wastedMovesData}
                    selectedWastedMove={selectedWastedMove}
                    setSelectedWastedMove={setSelectedWastedMove} 
                    setBoard={setBoard}
                    setWastedMovesIdx={setWastedMovesIdx} 
                />              
                <div className={`${className}_buttonsContainer`}>
                    <button className={`${className}_startButton`} onClick={handleStartClick}>
                        {gameActive ? 'Quit Game' : 'Start Game'}
                    </button>
                </div>
                {modalVisible && <PostGameModal 
                    setModalVisible={setModalVisible} 
                    score={score} 
                    userBest={userBest} 
                    userScoresTotal={userScoresTotal} 
                    userScoresCount={userScoresCount} 
                    globalBest={globalBest} 
                    globalScoresTotal={globalScoresTotal} 
                    globalScoresCount={globalScoresCount} 
                    spinnersVisible={spinnersVisible} 
                    wastedMoves={wastedMoves}
                    bestPathTotal={bestPathTotal}
                    userPathTotal={userPathTotal}
                />}  
            </div>
        </GameContext.Provider>
    )
}

export default Game