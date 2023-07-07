import { useState, useContext, useEffect } from 'react'
import EditSVG from '../../components/EditSVG'
import KnightSVG from '../../components/Knight/KnightSVG'
import UserMetrics from '../../components/UserMetrics'
import GlobalContext from '../../utils/GlobalContext'
import classNames from 'classnames'
import { Auth } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'
import './styles.css'

const Profile = () => {
    const { darkMode, userData, setUserLoggedIn } = useContext(GlobalContext)
    const [editActive, setEditActive] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [confirmActive, setConfirmActive] = useState(false) 
    const navigate = useNavigate()

    useEffect(() => {
        if (!userData) return
        setUsername(userData.attributes.preferred_username)
        setEmail(userData.attributes.email)
    }, [userData])

    useEffect(() => {
        setError('')
    }, [username, email])

    const handleEditClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (editActive) {
            setError('')
            setEditActive(false)        
        } else {
            setEditActive(true)
        }
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!username ) {
            setError('Please fill out username')
            return
        }
        try {
            const user = await Auth.currentAuthenticatedUser()
            await Auth.updateUserAttributes(user, {
                preferred_username: username
            })
            setEditActive(false)
            return
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteUser = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        try {
            const result = await Auth.deleteUser()
            if (result === 'SUCCESS') {
                setUserLoggedIn(false)
                navigate('/')
            }
        } catch (error) {
            console.log('Error deleting user', error)
        }
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
                    <p className={`${className}_email`}>{email}</p>
                </div>
                {editActive && <div className={`${className}_buttonContainer`} >
                    <button className={`${className}_button`} type="submit" disabled={!editActive}>Save Profile</button>
                </div>}
                {error && <p className={`${className}_error`} >{error}</p>}
            </form>            
            <UserMetrics />
            <div className={`${className}_deleteContainer`}>
                {confirmActive ?
                <>
                    <p className={`${className}_deleteText`}>Are you sure you want to delete your account?</p>
                    <div className={`${className}_deleteOptions`}>
                        <button className={`${className}_button ${className}_deleteButton`} onClick={handleDeleteUser}>Confirm Delete</button>
                        <button className={`${className}_button ${className}_button`} onClick={() => setConfirmActive(false)}>Cancel</button>
                    </div>
                </>
                :
                    <button className={`${className}_button ${className}_deleteButton`} onClick={() => setConfirmActive(true)}>Delete Account</button>
                }
            </div>
        </div>
    )
}

export default Profile