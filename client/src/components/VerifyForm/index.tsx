import { useContext, useState, useEffect } from 'react'
import GlobalContext from '../../utils/GlobalContext'
import { Auth } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import './styles.css'

const VerifyForm = () => {
    const { darkMode } = useContext(GlobalContext)
    const [username, setUsername] = useState('')
    const [verify, setVerify] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setError('')
    }, [username, verify])

    const handleResendCode = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!username) {
            setError('Please fill in username')
            return
        }
        const response = await Auth.resendSignUp(username)
        if (response) setError('Confirmation code resent')
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!username || !verify) {
            setError('Please fill in all fields')
            return
        }
        const response = await Auth.confirmSignUp(username, verify)
        if (response) navigate('/login')
    }

    const className = 'VerifyForm'
    return (
        <form className={classNames(className, darkMode && `${className}_darkMode`)} onSubmit={handleSubmit}>
            <h2 className={`${className}_title`}>Verify Email</h2>
            <p>Check your email for a verification code and enter below</p>
            <div className={`${className}_inputContainer`}>
                <label className={`${className}_label`} htmlFor="username">Username</label>
                <input className={`${className}_input`} type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className={`${className}_inputContainer`}>
                <label className={`${className}_label`} htmlFor="verify">Verify Code</label>
                <input className={`${className}_input`} type="text" id="verify" value={verify} onChange={(e) => setVerify(e.target.value)} />
            </div>
            <p>Didn't get a code? Enter your username above then <button className={`${className}_link`} onClick={handleResendCode} >Resend Code</button></p>
            <div className={`${className}_buttonContainer`}>
                <input className={`${className}_submitButton`} type="submit" value="Verify username" />
            </div>
            {error && <p className={`${className}_error`}>{error}</p>}
        </form>
    )
}

export default VerifyForm