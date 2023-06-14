import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import GlobalContext from '../../utils/GlobalContext'
import classNames from 'classnames'
import './styles.css'
import axios from 'axios'
import API from '../../api'

interface Props {
    score: number,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const PostGameModal: React.FC<Props> = ({ score, setModalVisible }) => {    
    const { darkMode, userLoggedIn } = useContext(GlobalContext)
    const [userBest, setUserBest] = useState<number | string>('N/A')
    const [userAverage, setUserAverage] = useState<number | string>('N/A')
    const [globalBest, setGlobalBest] = useState(0)
    const [globalAverage, setGlobalAverage] = useState(0)

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

    const className = 'PostGameModal'
    return (
        <div className={classNames(className, darkMode && className + '_darkMode')}>
            <div className={`${className}_container`}>
                <div className={`${className}_closeContainer`}>
                    <button className={`${className}_closeButton`} onClick={() => setModalVisible(false)}>X</button>
                </div>
                <h2 className={`${className}_title`}>Game Over</h2>
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
                <div className={`${className}_shareContainer`}>
                    <button className={`${className}_shareButton`}>Share Results</button>
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
            </div>
        </div>
    )
}

export default PostGameModal