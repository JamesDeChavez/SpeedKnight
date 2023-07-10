import { useContext, useState, useEffect } from 'react'
import GlobalContext from '../../utils/GlobalContext'
import { Auth } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import './styles.css'

const NewPasswordForm = () => {
    const { darkMode } = useContext(GlobalContext)
    const [username, setUsername] = useState('')
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setError('')
    }, [username, password, code])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!username || !password || !code) {
            setError('Please fill in all fields')
            return
        }
        try {
            const response = await Auth.forgotPasswordSubmit(username, code, password)
            if (response === 'SUCCESS') navigate('/login')
        } catch (error) {
            setError('Something went wrong')
            console.log('err', error)
        }
        
    }

    const className = 'NewPasswordForm'
    return (
        <form className={classNames(className, darkMode && `${className}_darkMode`)} onSubmit={handleSubmit}>
            <h2 className={`${className}_title`}>Update Password</h2>
            <p>Check your email for a verification code and enter below, along with your username and new password</p>
            <div className={`${className}_inputContainer`}>
                <label className={`${className}_label`} htmlFor="username">Username</label>
                <input className={`${className}_input`} type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className={`${className}_inputContainer`}>
                <label className={`${className}_label`} htmlFor="code">Code From Email</label>
                <input className={`${className}_input`} type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)} />
            </div>
            <div className={`${className}_inputContainer`}>
                <label className={`${className}_label`} htmlFor="password">New Password</label>
                <input className={`${className}_input`} type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className={`${className}_buttonContainer`}>
                <input className={`${className}_submitButton`} type="submit" value="Update Password" />
            </div>
            {error && <p className={`${className}_error`}>{error}</p>}
        </form>
    )
}

export default NewPasswordForm