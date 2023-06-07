import { useContext, useLayoutEffect, useRef } from 'react'
import GlobalContext from '../../utils/GlobalContext'
import classNames from 'classnames'
import ExampleBoard from '../../components/ExampleBoard'
import { NavLink } from 'react-router-dom'
import { gsap } from 'gsap'
import './styles.css'

const Instructions = () => {
    const { darkMode } = useContext(GlobalContext)
    const root = useRef(null)    

    useLayoutEffect(() => {
        const gsapContext = gsap.context(() => {
            gsap.fromTo(`.${className}_title`, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5 })
            gsap.fromTo(`.${className}_summary`, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5 })
            gsap.fromTo(`.${className}_list`, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5 })
            gsap.fromTo(`.${className}_exampleContainer`, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5 })
            gsap.fromTo(`.${className}_callToAction`, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5 })
            return () => gsapContext.revert()
        }, root)
    }, [])

    const className = 'Instructions'
    return (
        <div className={classNames(className, darkMode && className + '_darkMode')} ref={root}>
            <h2 className={`${className}_title`}>How To Play</h2>
            <p className={`${className}_summary`}>Capture as many pawns as you can</p>
            <ul className={`${className}_list`}>
                <li className={`${className}_listitem`}>Pawns randomly appear on the board</li>
                <li className={`${className}_listitem`}>You have 60 second to capture as many pawns as you can</li>
                <li className={`${className}_listitem`}>The color of the chess board tiles will turn red if it is a valid move for your knight </li>
            </ul>
            <div className={`${className}_exampleContainer`}>
                <h3>Example</h3>
                <ExampleBoard />
                <p>Each red tile above represents a valid move you can click</p>
            </div>
            <div className={`${className}_callToAction`}>
                <NavLink to={'/login'} className={`${className}_callToActionLink`}>
                    Log in 
                </NavLink>
                <span> or </span>
                <NavLink to={'/register'} className={`${className}_callToActionLink`}>
                    create an account
                </NavLink>
                <span> to track your stats</span>
            </div>
        </div>
    )
}

export default Instructions