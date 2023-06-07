import { useContext, useLayoutEffect, useRef } from 'react'
import GlobalContext from '../../utils/GlobalContext'
import './styles.css'
import classNames from 'classnames'
import { gsap } from 'gsap'

const LoginForm = () => {
    const { darkMode } = useContext(GlobalContext)
    const root = useRef(null)

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.fromTo(`.${className}_title`, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5 })
            gsap.fromTo(`.${className}_inputContainer`, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5 })
            gsap.fromTo(`.${className}_buttonContainer`, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5 })
            return () => gsapContext.revert()
        }, root)
    }, [])

    const className = 'LoginForm'
    return (
        <form className={classNames(className, darkMode && className + '_darkMode')} ref={root}>
            <h2 className={`${className}_title`}>Log in</h2>
            <div className={`${className}_inputContainer`}>
                <label className={`${className}_label`} htmlFor="email">Email</label>
                <input className={`${className}_input`} type="email" id="email" />
            </div>
            <div className={`${className}_inputContainer`}>
                <label className={`${className}_label`} htmlFor="password">Password</label>
                <input className={`${className}_input`} type="password" id="password" />
            </div>
            <div className={`${className}_buttonContainer`}>
                <input className={`${className}_submitButton`} type="submit" value="Log in" />
            </div>
        </form>
    )
}

export default LoginForm