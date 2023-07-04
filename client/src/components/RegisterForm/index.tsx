import { useState, useEffect, useContext, useLayoutEffect, useRef } from 'react'
import GlobalContext from '../../utils/GlobalContext'
import classNames from 'classnames'
import { gsap } from 'gsap'
import { useNavigate } from 'react-router-dom'
import GoogleSVG from '../GoogleSVG'
import { Auth } from 'aws-amplify'
import InfoSVG from '../InfoSVG'
import './styles.css'

const RegisterForm = () => {
    const { darkMode, setUserLoggedIn } = useContext(GlobalContext)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [error, setError] = useState('')
    const [pwModalVisible, setPwModalVisible] = useState(false)
    const root = useRef(null)
    const root2 = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        setError('')
    }, [username, email, password, repeatPassword])

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.fromTo(`.${className}_title`, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5 })
            gsap.fromTo(`.${className}_inputContainer`, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5 })
            gsap.fromTo(`.${className}_buttonContainer`, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5 })
            gsap.fromTo(`.${className}_seperatorContainer`, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5 })
            return () => gsapContext.revert()
        }, root)

        const gsapContext2 = gsap.context(() => {
            gsap.fromTo(`.${className}_oauthButton`, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5 })
            return () => gsapContext2.revert()
        }, root2)
    }, [])
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!username || !email || !password || !repeatPassword) {
            setError('Please fill in all fields')
            return
        }
        if (password !== repeatPassword) {
            setError('Passwords do not match')
            return
        }
        const specialFormat = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        if (password.length < 8) {
            setError('Password must be at least 8 characters')
            return
        } else if (password.search(/[a-z]/) < 0) {
            setError("Password must contain a lower case letter")
            return
        } else if(password.search(/[A-Z]/) < 0) {
            setError("Password must contain an uppser case letter")
            return
        } else if (password.search(/[0-9]/) < 0) {
            setError("Password must contain a number")
            return
        } else if (!specialFormat.test(password)) {
            setError("Password must contain a special character")
            return
        } else if (password[0] === " " || password[password.length - 1] === " ") {
            setError("Password cannot start or end with a space")
            return
        } else {
            setError('')
        }

        try {
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: { email },
                autoSignIn: { enabled: true }
            })
            console.log('userData', user)
            if (user) {
                setUserLoggedIn(true)
                navigate('/')
            }
        } catch (error) {
            setError("Something went wrong")
            console.log('error', error)
            return
        }
            
    }

    const className = 'RegisterForm'
    return (<>
        <form className={classNames(className, darkMode && className + '_darkMode')} ref={root} onSubmit={handleSubmit}>
            <h2 className={`${className}_title`}>Create Account</h2>
            <div className={`${className}_inputContainer`}>
                <label className={`${className}_label`} htmlFor="username">Username</label>
                <input className={`${className}_input`} type="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className={`${className}_inputContainer`}>
                <label className={`${className}_label`} htmlFor="email">Email</label>
                <input className={`${className}_input`} type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={`${className}_inputContainer`}>
                <div className={`${className}_passwordLabelContainer`}>
                    <label className={`${className}_label`} htmlFor="password">Password</label>
                    <div className={`${className}_svgContainer`} onMouseEnter={() => setPwModalVisible(true)} onMouseLeave={() => setPwModalVisible(false)} >
                        <InfoSVG />                    
                    </div>
                </div>
                <input className={`${className}_input`} type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className={`${className}_inputContainer`}>
                <label className={`${className}_label`} htmlFor="repeatPassword">Repeat Password</label>
                <input className={`${className}_input`} type="password" id="repeatPassword" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
            </div>
            <div className={`${className}_buttonContainer`}>
                <input className={`${className}_submitButton`} type="submit" value="Register" />
            </div>
            {error && <p className={`${className}_error`}>{error}</p>}
            <div className={`${className}_passwordModal`} style={{display: pwModalVisible ? 'block' : 'none'}}>
                <h3 className={`${className}_passwordModalTitle`}>Password Requirements</h3>
                <ul className={`${className}_passwordModalList`}>
                    <li className={`${className}_passwordModalListItem`}>Password must contain a lower case letter</li>
                    <li className={`${className}_passwordModalListItem`}>Password must contain an upper case letter</li>
                    <li className={`${className}_passwordModalListItem`}>Password must contain a number</li>
                    <li className={`${className}_passwordModalListItem`}>Password must contain at least 8 characters</li>
                    <li className={`${className}_passwordModalListItem`}>Password must contain a special character</li>
                    <li className={`${className}_passwordModalListItem`}>Password must not contain a leading or trailing space</li>
                </ul>
            </div>
            <div className={`${className}_seperatorContainer`}>
                <p className={`${className}_seperator`}>or</p>
            </div>
        </form>
        <div className={classNames(`${className}_oauthContainer`, darkMode && `${className}_oauthContainer` + '_darkMode')} ref={root2}>
            <button className={`${className}_oauthButton`} onClick={() => console.log('tbd')}>
                <GoogleSVG />
                Register with Google
            </button>
        </div>
    </>)
}

export default RegisterForm