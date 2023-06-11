import { useState, useContext, useEffect } from 'react'
import EditSVG from '../../components/EditSVG'
import KnightSVG from '../../components/Knight/KnightSVG'
import UserMetrics from '../../components/UserMetrics'
import GlobalContext from '../../utils/GlobalContext'
import classNames from 'classnames'
import './styles.css'

const Profile = () => {
    const { darkMode } = useContext(GlobalContext)
    const [editActive, setEditActive] = useState(false)
    const [username, setUsername] = useState('testUser')
    const [email, setEmail] = useState('test@email.com')
    const [password, setPassword] = useState('fakePassword123')
    const [error, setError] = useState('')

    useEffect(() => {
        setError('')
    }, [username, email, password])

    const handleEditClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (editActive) {
            setError('')
            setEditActive(false)
        
        } else {
            setEditActive(true)
        }
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!username || !email || !password) {
            setError('Please fill out all fields')
            return
        }
        console.log(username, email, password)
    }

    const className = 'Profile'
    return (
        <div className={classNames(className, darkMode && className + '_darkMode')}>
            <div className={`${className}_titleContainer`}>
                <div className={`${className}_knightContainer`}>
                    <KnightSVG />
                </div>
                <h2 className={`${className}_title`}>Profile</h2>
                <button className={`${className}_editContainer`} onClick={handleEditClick} >
                    <EditSVG />
                    {editActive ? 'Cancel' : 'Edit'}
                </button>
            </div>
            <form className={`${className}_form`} onSubmit={handleFormSubmit}>
                <div className={`${className}_contentContainer`}>
                    <label className={`${className}_label`} htmlFor="username">Username</label>
                    <input className={`${className}_input`} type="username" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} disabled={!editActive} />
                </div>
                <div className={`${className}_contentContainer`}>
                    <label className={`${className}_label`} htmlFor="email">Email</label>
                    <input className={`${className}_input`} type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!editActive} />
                </div>
                <div className={`${className}_contentContainer`}>
                    <label className={`${className}_label`} htmlFor="password">Password</label>
                    <input className={`${className}_input`} type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={!editActive} />
                </div>
                {editActive && <div className={`${className}_buttonContainer`} >
                    <button className={`${className}_button`} type="submit" disabled={!editActive}>Save Profile</button>
                </div>}
                {error && <p className={`${className}_error`} >{error}</p>}
            </form>
            <UserMetrics />
        </div>
    )
}

export default Profile