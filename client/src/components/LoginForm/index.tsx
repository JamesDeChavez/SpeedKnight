import { useState, useContext, useLayoutEffect, useRef, useEffect } from 'react'
import GlobalContext from '../../utils/GlobalContext'
import classNames from 'classnames'
import { gsap } from 'gsap'
import { useNavigate } from 'react-router-dom'
import { TokenResponse, useGoogleLogin} from '@react-oauth/google'
import axios from 'axios'
import GoogleSVG from '../GoogleSVG'
import TwitterSVG from '../TwitterSVG'
import FacebookSVG from '../FacebookSVG'
import './styles.css'

const LoginForm = () => {
    const { darkMode } = useContext(GlobalContext)
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

    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!username || !password) {
            setError('Please fill in all fields')
            return
        }
        console.log({ username, password })
        navigate('/')
    }

    const handleTwitterClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        console.log('test twitter click')
    }

    const handleFacebookClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        console.log('test facebook click')
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
            <button className={`${className}_oauthButton`} onClick={handleTwitterClick}>
                <TwitterSVG />
                Sign in with Twitter
            </button>
            <button className={`${className}_oauthButton`} onClick={handleFacebookClick}>
                <FacebookSVG />
                Sign in with Facebook
            </button>
        </div>
    </>)
}

export default LoginForm