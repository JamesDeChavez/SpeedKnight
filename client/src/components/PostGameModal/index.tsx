import React, { useContext, useEffect, useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import GlobalContext from '../../utils/GlobalContext'
import classNames from 'classnames'
import API from '../../api'
import html2canvas from 'html2canvas'
import './styles.css'

interface Props {
    score: number,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const PostGameModal: React.FC<Props> = ({ score, setModalVisible }) => {    
    const { darkMode, userLoggedIn } = useContext(GlobalContext)
    const [userBest, setUserBest] = useState<number | string>('N/A')
    const [userAverage, setUserAverage] = useState<number | string>('N/A')
    const [globalBest, setGlobalBest] = useState<number | string>('-')
    const [globalAverage, setGlobalAverage] = useState<number | string>('-')
    const [clipBoardModalVisible, setClipBoardModalVisible] = useState(false)
    const canvasRef = useRef(null)

    useEffect(() => {
        setUserBest(38)
        setUserAverage(31)
        const fetchGlobalScores = async () => {
            try {                
                const data = await API.Score.getGlobalScores()
                if (data) {
                    setGlobalBest(data.global.best)
                    setGlobalAverage(data.global.average)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchGlobalScores()
    }, [])

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
                            <p className={`${className}_metricNumber`}>{userBest}</p>
                            <p className={`${className}_metricText`}>Your Best</p>
                        </div>
                        <div className={`${className}_metric`}>
                            <p className={`${className}_metricNumber`}>{userAverage}</p>
                            <p className={`${className}_metricText`}>Your Average</p>
                        </div>
                        <div className={`${className}_metric`}>
                            <p className={`${className}_metricNumber`}>{globalBest}</p>
                            <p className={`${className}_metricText`}>Global Best</p>
                        </div>
                        <div className={`${className}_metric`}>
                            <p className={`${className}_metricNumber`}>{globalAverage}</p>
                            <p className={`${className}_metricText`}>Global Average</p>
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
                    <span> to track your stats</span>
                </div>
                {clipBoardModalVisible && <div className={`${className}_clipboardModal`}>
                    <p className={`${className}_clipboardModalText`}>Results copied to clipboard</p>
                </div> }
            </div>
        </div>
    )
}

export default PostGameModal