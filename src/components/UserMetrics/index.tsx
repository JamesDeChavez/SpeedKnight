import { useContext } from 'react'
import GlobalContext from '../../utils/GlobalContext'
import classNames from 'classnames'
import './styles.css'

const UserMetrics = () => {
    const { darkMode } = useContext(GlobalContext)
    const className = 'UserMetrics'
    return (
        <div className={classNames(className, darkMode && className + '_darkMode')}>
            <h3 className={`${className}_title`} >Your Metrics</h3>            
            <div className={`${className}_metricsContainer`}>
                    <div className={`${className}_metric`}>
                        <p className={`${className}_metricNumber`}>30</p>
                        <p className={`${className}_metricText`}>Last Game</p>
                    </div>
                    <div className={`${className}_metric`}>
                        <p className={`${className}_metricNumber`}>30</p>
                        <p className={`${className}_metricText`}>Average</p>
                    </div>
                    <div className={`${className}_metric`}>
                        <p className={`${className}_metricNumber`}>30</p>
                        <p className={`${className}_metricText`}>Best</p>
                    </div>
                </div>
        </div>
    )
}

export default UserMetrics