import { useContext } from 'react'
import './styles.css'
import GlobalContext from '../../utils/GlobalContext'
import classNames from 'classnames'

interface Props {
    score: number,
    time: number
}

const ScoreTimeHeader: React.FC<Props> = ({ score, time }) => {
    const { darkMode } = useContext(GlobalContext)
    const className = 'ScoreTimeHeader'
    return (
        <div className={classNames(className, darkMode && `${className}_darkMode`)}>
            <p className={`${className}_score`}>{`Score: ${score}`}</p>
            <p className={`${className}_time`}>{`Time: ${time}`}</p>
        </div>
    )
}

export default ScoreTimeHeader