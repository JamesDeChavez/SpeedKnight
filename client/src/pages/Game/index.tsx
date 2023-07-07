import React, { useState, useRef, useEffect, useLayoutEffect, useContext } from 'react'
import Board from '../../components/Board'
import { gsap } from 'gsap'
import GlobalContext from '../../utils/GlobalContext'
import classNames from 'classnames'
import PostGameModal from '../../components/PostGameModal'
import { API, Auth } from 'aws-amplify'
import './styles.css'

interface Props {
    root: React.MutableRefObject<null>
}

const Game: React.FC<Props> = ({ root }) => {
    const { darkMode, userLoggedIn, userData  } = useContext(GlobalContext)
    const [gameActive, setGameActive] = useState(false)
    const [score, setScore] = useState(0)
    const [time, setTime] = useState(60)
    const [userBest, setUserBest] = useState(0)
    const [userScoresTotal, setUserScoresTotal] = useState(0)
    const [userScoresCount, setUserScoresCount] = useState(1)
    const [globalBest, setGlobalBest] = useState(0)
    const [globalScoresTotal, setGlobalScoresTotal] = useState(0)
    const [globalScoresCount, setGlobalScoresCount] = useState(1)
    const [scoreSubmitted, setScoreSubmitted] = useState(false)
    const [modalVisible, setModalVisible] = useState(true)
    const timeRef = useRef<number>(0)
    const intervalRef = useRef<NodeJS.Timer>()
    const scoreRef = useRef<number>(score)

    useEffect(() => {
        timeRef.current = time
    }, [time])

    useEffect(() => {
        scoreRef.current = score
    }, [score])

    useEffect(() => {
        if (!scoreSubmitted) return
        const getUserMetrics = async () => {
            if (!userData) {
                setUserBest(Number(sessionStorage.getItem('bestScore')) || 0)
                setUserScoresTotal(Number(sessionStorage.getItem('scoresTotal')) || 0)
                setUserScoresCount(Number(sessionStorage.getItem('scoresCount')) || 1)
                return
            }
            const apiName = 'SpeedKnightChallenge'
            const path = '/score/user'            
            const currentUserId = userData.attributes ? userData.attributes.sub : userData.signInUserSession.idToken.payload.sub
            const myInit: any = {
                queryStringParameters: {
                    userId: currentUserId
                },
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
            } catch (error) {
                console.log('error', error)
            }
        }
        
        const getGlobalMetrics = async () => {
            const apiName = 'SpeedKnightChallenge'
            const path = '/score/global'
            const myInit: any = {
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json"
                }
            }
            try {
                const response = await API.get(apiName, path, myInit)
                setGlobalBest(response.scoreMax)
                setGlobalScoresTotal(response.scoresTotal)
                setGlobalScoresCount(response.scoresCount)
            } catch (error) {
                console.log('error', error)
            }
        }
        getUserMetrics()
        getGlobalMetrics()
        setModalVisible(true)
        setScoreSubmitted(false)
    }, [scoreSubmitted])

    useEffect(() => {
        if (timeRef.current > 0 || gameActive) return
        const submitScore = async () => {
            if (!userLoggedIn) {
                sessionStorage.setItem(
                    'scoresTotal', 
                    sessionStorage.getItem('scoresTotal') 
                        ? `${Number(sessionStorage.getItem('scoresTotal')) + scoreRef.current}` 
                        : `${scoreRef.current}`)
                sessionStorage.setItem(
                    'scoresCount', 
                    sessionStorage.getItem('scoresCount') 
                        ? `${Number(sessionStorage.getItem('scoresCount')) + 1}` 
                        : '1')
                sessionStorage.setItem(
                    'bestScore',
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
                    createdAt: new Date().getTime()
                }, 
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json"
                } 
            }
            try {
                await API.post(apiName, path, myInit)
                setScoreSubmitted(true)
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
        <div className={classNames(className, darkMode && className + '_darkMode')}>
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
            {modalVisible && <PostGameModal setModalVisible={setModalVisible} score={score} userBest={userBest} userScoresTotal={userScoresTotal} userScoresCount={userScoresCount} globalBest={globalBest} globalScoresTotal={globalScoresTotal} globalScoresCount={globalScoresCount} scoresSubmitted={scoreSubmitted} />}  
        </div>
    )
}

export default Game