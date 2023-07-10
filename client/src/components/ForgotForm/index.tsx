import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import GlobalContext from '../../utils/GlobalContext'
import { Auth } from 'aws-amplify'
import classNames from 'classnames'
import './styles.css'

const ForgotForm = () => {
    const { darkMode } = useContext(GlobalContext)
    const [username, setUsername] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setError('')
    }, [username])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (username === '') {
            setError('Please enter a username')
            return
        }
        try {
            const response = await Auth.forgotPassword(username)
            if (response) {
                navigate('/newPassword')
            }
        } catch (error) {
            setError("Something went wrong")
            console.log('err', error)            
        }
    }

    const className = 'ForgotForm'
    return (
        <form onSubmit={handleSubmit} className={classNames(className, darkMode && `${className}_darkMode`)}>
            <h2 className={`${className}_title`}>Forgot Your Password?</h2>
            <p className={`${className}_text`} >Enter your Username below and we will send you a code to reset your password</p>
            <div className={`${className}_inputContainer`}>
                <label className={`${className}_label`} htmlFor="username">Username</label>
                <input className={`${className}_input`} type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className={`${className}_buttonContainer`}>
                <input className={`${className}_submitButton`} type="submit" value="Send Code" />
                <button className={`${className}_link`} onClick={() => navigate('/newPassword')} >Already have a code?</button>
            </div>
            {error && <p className={`${className}_error`}>{error}</p>}
        </form>
    )
}

export default ForgotForm