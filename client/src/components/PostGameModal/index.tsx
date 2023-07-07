import React, { useContext, useEffect, useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import GlobalContext from '../../utils/GlobalContext'
import classNames from 'classnames'
import html2canvas from 'html2canvas'
import './styles.css'
import Spinner from '../Spinner'

interface Props {
    score: number,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    userBest: number,
    userScoresTotal: number,
    userScoresCount: number,
    globalBest: number,
    globalScoresTotal: number,
    globalScoresCount: number, 
    scoresSubmitted: boolean
}

const PostGameModal: React.FC<Props> = ({ score, setModalVisible, userBest, userScoresTotal, userScoresCount, globalBest, globalScoresTotal, globalScoresCount, scoresSubmitted }) => {    
    const { darkMode, userLoggedIn } = useContext(GlobalContext)
    const [clipBoardModalVisible, setClipBoardModalVisible] = useState(false)
    const canvasRef = useRef(null)

    useEffect(() => {
        if (!clipBoardModalVisible) return
        const timer = setTimeout(() => {
            setClipBoardModalVisible(false)
        }, 5000)
        return () => clearTimeout(timer)
    }, [clipBoardModalVisible])

    const copyCanvasToClipboard = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!canvasRef) return
        const canvas = await html2canvas(canvasRef.current! as HTMLCanvasElement, {
            scale: 1,
            useCORS: true
        })
        canvas.toBlob((blob) => {
            const data = new ClipboardItem({ 'image/png': blob! })
            navigator.clipboard.write([data])
        })
        setClipBoardModalVisible(true)
    }
    

    const className = 'PostGameModal'
    return (
        <div className={classNames(className, darkMode && className + '_darkMode')}>
            <div className={`${className}_container`}>
                <div className={`${className}_closeContainer`}>
                    <button className={`${className}_closeButton`} onClick={() => setModalVisible(false)}>X</button>
                </div>
                <div className={`${className}_canvasContainer`} ref={canvasRef}>
                    <h2 className={`${className}_title`}>Speed Knight Challenge</h2>
                    <p className={`${className}_text`}>{`You captured ${score} pawns in 60 seconds!`}</p>
                    <div className={`${className}_scoreContainer`}>
                        <p className={`${className}_score`}>{score}</p>
                        <p className={`${className}_scoreText`}>Your Score</p>
                    </div>
                    <div className={`${className}_metricsContainer`}>
                        <div className={`${className}_metric`}>
                            {scoresSubmitted ?
                                <Spinner />
                            :
                                <p className={`${className}_metricNumber`}>{Math.floor(userScoresTotal / userScoresCount)}</p>
                            }
                            <p className={`${className}_metricText`}>Your Average</p>
                        </div>
                        <div className={`${className}_metric`}>
                            {scoresSubmitted ?
                                <Spinner />
                            :
                                <p className={`${className}_metricNumber`}>{userBest}</p>
                            }
                            <p className={`${className}_metricText`}>Your Best</p>
                        </div>
                        <div className={`${className}_metric`}>
                            {scoresSubmitted ?
                                <Spinner />
                            :
                                <p className={`${className}_metricNumber`}>{Math.floor(globalScoresTotal / globalScoresCount)}</p>
                            }
                            <p className={`${className}_metricText`}>Global Average</p>
                        </div>
                        <div className={`${className}_metric`}>
                            {scoresSubmitted ?
                                <Spinner />
                            :
                                <p className={`${className}_metricNumber`}>{globalBest}</p>
                            }
                            <p className={`${className}_metricText`}>Global Best</p>
                        </div>
                    </div>
                </div>
                <div className={`${className}_shareContainer`}>
                    <button className={`${className}_shareButton`} onClick={copyCanvasToClipboard} >Share Results</button>
                </div>                    
                <div className={`${className}_callToAction`} style={{ display: userLoggedIn ? 'none' : 'block' }}>
                    <NavLink to={'/login'} className={`${className}_callToActionLink`} onClick={() => setModalVisible(false)}>
                        Log in 
                    </NavLink>
                    <span> or </span>
                    <NavLink to={'/register'} className={`${className}_callToActionLink`} onClick={() => setModalVisible(false)}>
                        create an account
                    </NavLink>
                    <span> to track your stats and submit you scores</span>
                </div>
                {clipBoardModalVisible && <div className={`${className}_clipboardModal`}>
                    <p className={`${className}_clipboardModalText`}>Results copied to clipboard</p>
                </div> }
            </div>
        </div>
    )
}

export default PostGameModal