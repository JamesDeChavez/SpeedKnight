import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import './styles.css'
import GlobalContext from '../../utils/GlobalContext'
import classNames from 'classnames'

interface Props {
    score: number,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const PostGameModal: React.FC<Props> = ({ score, setModalVisible }) => {    
    const { darkMode } = useContext(GlobalContext)
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
                        <p className={`${className}_metricNumber`}>30</p>
                        <p className={`${className}_metricText`}>Your Best</p>
                    </div>
                    <div className={`${className}_metric`}>
                        <p className={`${className}_metricNumber`}>30</p>
                        <p className={`${className}_metricText`}>Your Average</p>
                    </div>
                    <div className={`${className}_metric`}>
                        <p className={`${className}_metricNumber`}>30</p>
                        <p className={`${className}_metricText`}>Global Best</p>
                    </div>
                    <div className={`${className}_metric`}>
                        <p className={`${className}_metricNumber`}>30</p>
                        <p className={`${className}_metricText`}>Global Average</p>
                    </div>
                </div>                    
                <div className={`${className}_callToAction`}>
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