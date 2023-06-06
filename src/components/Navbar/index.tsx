import { useState, useRef, useLayoutEffect, useContext } from 'react'
import { gsap } from 'gsap'
import LightModeToggle from '../LightModeToggle'
import classNames from 'classnames'
import GlobalContext from '../../utils/GlobalContext'
import { NavLink } from 'react-router-dom'
import './styles.css'

const Navbar = () => {
    const { darkMode } = useContext(GlobalContext)
    const [navVisible, setNavVisible] = useState(false)
    const lineOne = useRef(null)
    const lineTwo = useRef(null)
    const lineThree = useRef(null)
    const root = useRef(null)
    const delay = useRef(0.2)
    const hoverTimeline = useRef<gsap.core.Timeline>()
    const clickTimeline = useRef<gsap.core.Timeline>()

    useLayoutEffect(() => {        
        let gsapContext = gsap.context(() => {
            //Burger click animation
            clickTimeline.current = gsap.timeline({ paused: true })
            .set('.Navbar_line', { scaleX: 1 })
            .to(lineOne.current, { duration: .2, y: 20 }, 'combine')
            .to(lineThree.current, {  duration: .2, y: -20 }, 'combine')
            .set('.Navbar_line', { transformOrigin: 'center' })
            .to(lineOne.current, { duration: 0.2, rotate: 45}, 'rotate')
            .to(lineTwo.current, { duration: 0.2, rotate: -45}, 'rotate')
            .to(lineThree.current, { duration: 0.2, rotate: -45}, 'rotate')
            .from(`.${className}_navButtonsContainer`, { duration: 0.2, x: '100%'}, 'rotate')

        }, root)

        return () => gsapContext.revert()
    }, [])

    useLayoutEffect(() => {
        delay.current = !navVisible ? 0.2 : 0
        
        let gsapContext = gsap.context(() => {
            //Yoyo hover animation
            hoverTimeline.current = gsap.timeline({ repeat: -1, paused: true })
                .to(lineOne.current, { duration: 0.6, scaleX: 0.5 }, 'shrink')
                .to(lineTwo.current, { duration: 0.6, scaleX: 0.5, delay: delay.current }, 'shrink')
                .to(lineThree.current, { duration: 0.6, scaleX: 0.5, delay: 2*delay.current }, 'shrink')
                .to(lineOne.current, { duration: 0.6, scaleX: 1, delay: -2*delay.current }, 'grow')
                .to(lineTwo.current, { duration: 0.6, scaleX: 1, delay: -delay.current }, 'grow')
                .to(lineThree.current, { duration: 0.6, scaleX: 1, delay: 0 }, 'grow')
        }, root)
        
        return () => gsapContext.revert()
    }, [navVisible])

    const handleHamburgerMouseEnter = () => {
        hoverTimeline.current?.repeat(-1)
        hoverTimeline.current?.restart()
    }

    const handleHamburgerMouseLeave = () => {
        if (!hoverTimeline.current) return        
        let repeats = Math.floor(hoverTimeline.current.totalTime() / hoverTimeline.current.duration())
        hoverTimeline.current.repeat(repeats)
    }    
    
    const handleHamburgerClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!navVisible && clickTimeline.current) {
            clickTimeline.current.play()
        } 
        else if (clickTimeline.current) {
            clickTimeline.current.reverse()
        }
        setNavVisible(prevState => !prevState)
    }

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (navVisible && clickTimeline.current) {
            clickTimeline.current.reverse()
        }
        setNavVisible(false)
    }

    const className = 'Navbar'
    return (
        <div className={classNames(className, darkMode && className + '_darkMode')} ref={root}>
            <h1 className={`${className}_title`}>
                <NavLink to="/" onClick={handleLinkClick} >Speed Knight Challenge</NavLink>
            </h1>
            <button 
                className={`${className}_hamburgerContainer`} 
                onClick={handleHamburgerClick}
                onMouseEnter={handleHamburgerMouseEnter}
                onMouseLeave={handleHamburgerMouseLeave}
                data-testid='BurgerIconButton'
                aria-label='Navbar Button'
            >
                <svg className={`${className}_hamburger`} viewBox="0 0 100 100">
                    <rect className={`${className}_topLine ${className}_line`}
                        width={60} height={5}
                        x={20} y={30}
                        ref={lineOne}
                    />
                    <rect className={`${className}_midLine ${className}_line`}
                        width={60} height={5}
                        x={20} y={50}
                        ref={lineTwo}
                    />
                    <rect className={`${className}_botLine ${className}_line`}
                        width={60} height={5}
                        x={20} y={70}
                        ref={lineThree}
                    />                        
                </svg>
            </button>
            <div className={`${className}_navButtonsContainer`} style={{display: navVisible ? 'grid' : 'none'}}>
                <button className={`${className}_navButton`}>
                    Light / Dark <LightModeToggle />
                </button>
                <button className={`${className}_navButton`}>
                    <NavLink to="/instructions" onClick={handleLinkClick} >How to Play</NavLink>
                </button>
                <button className={`${className}_navButton`}>
                    <NavLink to="/login" onClick={handleLinkClick} >Login</NavLink>
                </button>
                <button className={`${className}_navButton`}>
                    <NavLink to="/register" onClick={handleLinkClick} >Create Account</NavLink>
                </button>
            </div>
        </div>
    )
}

export default Navbar