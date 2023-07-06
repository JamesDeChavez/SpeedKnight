import React, { useState, useContext, useLayoutEffect, useRef, useEffect } from 'react'
import GlobalContext from '../../utils/GlobalContext'
import classNames from 'classnames'
import { gsap } from 'gsap'
import { useNavigate } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth'
import GoogleSVG from '../GoogleSVG'
import './styles.css'

const LoginForm = () => {
    const { darkMode, setUserLoggedIn } = useContext(GlobalContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const root = useRef(null)
    const root2 = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        setError('')
    }, [username, password])

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
        if (!username || !password) {
            setError('Please fill in all fields')
            return
        }
        try {
            const user = await Auth.signIn(username, password)
            console.log('userData', user)
            if (user) { 
                setUserLoggedIn(true)
                navigate('/')
            }
        } catch (error: any) {
            setError(error.toString().includes('UserNotConfirmedException') 
                ? "Please confirm your email address before loggin in" 
                : "Something went wrong" )
            console.log(error)
        }
    }

    const className = 'LoginForm'
    return (<>
        <form className={classNames(className, darkMode && className + '_darkMode')} ref={root} onSubmit={handleSubmit}>
            <h2 className={`${className}_title`}>Log in</h2>
            <div className={`${className}_inputContainer`}>
                <label className={`${className}_label`} htmlFor="username">Username</label>
                <input className={`${className}_input`} type="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className={`${className}_inputContainer`}>
                <label className={`${className}_label`} htmlFor="password">Password</label>
                <input className={`${className}_input`} type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className={`${className}_buttonContainer`}>
                <input className={`${className}_submitButton`} type="submit" value="Log in" />
            </div>
            {error && <p className={`${className}_error`}>{error}</p>}
            <div className={`${className}_seperatorContainer`}>
                <p className={`${className}_seperator`}>or</p>
            </div>
        </form>
        <div className={classNames(`${className}_oauthContainer`, darkMode && `${className}_oauthContainer` + '_darkMode')} ref={root2}>
            <button className={`${className}_oauthButton`} onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}>
                <GoogleSVG />
                Sign in with Google
            </button>
        </div>
    </>)
}

export default LoginForm