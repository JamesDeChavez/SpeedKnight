import { useContext } from 'react'
import GlobalContext from '../../utils/GlobalContext'
import classNames from 'classnames'
import './styles.css'

const LightModeToggle = () => {
    const { darkMode,setDarkMode } = useContext(GlobalContext)

    const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        setDarkMode(e.currentTarget.checked)
        localStorage.setItem('darkMode', e.currentTarget.checked.toString())
    }

    const className = 'LightModeToggle'
    return (
        <div className={classNames(className, darkMode && className + '_darkMode')}>
            <input className={`${className}_input`} type="checkbox" id="toggle" onClick={handleClick} checked={darkMode} readOnly />
            <label className={`${className}_label`} htmlFor="toggle" ></label>
        </div>
    )
}

export default LightModeToggle