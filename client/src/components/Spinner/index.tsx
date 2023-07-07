import GlobalContext from '../../utils/GlobalContext'
import { useContext } from 'react'
import './styles.css'
import classNames from 'classnames'

const Spinner = () => {
    const { darkMode } = useContext(GlobalContext)
    const className = 'Spinner'
    return (
        <div className={classNames(className, darkMode && className + '_darkMode')}></div>
    )
}

export default Spinner