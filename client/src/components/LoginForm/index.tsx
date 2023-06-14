import { useState, useContext, useLayoutEffect, useRef, useEffect } from 'react'
import GlobalContext from '../../utils/GlobalContext'
import classNames from 'classnames'
import { gsap } from 'gsap'
import { useNavigate } from 'react-router-dom'
import { TokenResponse, useGoogleLogin } from '@react-oauth/google'
import GoogleSVG from '../GoogleSVG'
import TwitterSVG from '../TwitterSVG'
import FacebookSVG from '../FacebookSVG'
import axios from 'axios'
import API from '../../api'
import './styles.css'

const LoginForm = () => {
    const { darkMode, setUserLoggedIn } = useContext(GlobalContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [oauthData, setOauthData] = useState<Omit<TokenResponse, "error" | "error_description" | "error_uri">>()
    const root = useRef(null)
    const root2 = useRef(null)
    const navigate = useNavigate()
    const googleLogin = useGoogleLogin({
        onSuccess: tokenResponse => setOauthData(tokenResponse),
        onError: error => console.log(error),
    })

    useEffect(() => {
        setError('')
    }, [username, password])

    useEffect(() => {
        if (!oauthData) return
        console.log(oauthData)
        axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${oauthData.access_token}`,
            { headers: {
                Authorization: `Bearer ${oauthData.access_token}`,
                Accept: 'application/json'
            }}
        ).then(res => {
            const oauthEmail = res.data.email
            console.log('oauthEmail', oauthEmail)
        }).catch(err => {
            console.log(err)
        })
    }, [oauthData])

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
            const userData = await API.User.login(username, password)
            console.log('userData', userData)
            if (userData) setUserLoggedIn(true)
            navigate('/')
        } catch (error) {
            setError("Something went wrong")
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
            <button className={`${className}_oauthButton`} onClick={() => googleLogin()}>
                <GoogleSVG />
                Sign in with Google
            </button>
            <a className={`${className}_oauthButton`} href='http://localhost:3000/auth/twitter'>
                <TwitterSVG />
                Sign in with Twitter
            </a>
            <a className={`${className}_oauthButton`} href='http://localhost:3000/auth/facebook'>
                <FacebookSVG />
                Sign in with Facebook
            </a>
        </div>
    </>)
}

export default LoginForm