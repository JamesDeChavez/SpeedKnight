import { useRef, useState } from 'react'
import Game from './pages/Game'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Instructions from './pages/Instructions'
import GlobalContext from './utils/GlobalContext'
import classNames from 'classnames'
import NavbarWrapper from './components/NavbarWrapper'
import Profile from './pages/Profile'
import './App.css'

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const root = useRef(null)

  const router = createBrowserRouter([
    { path: '/', element: <NavbarWrapper />, children: [
      { path: '/', element: <Game root={root} /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/instructions', element: <Instructions /> },
      { path: '/profile', element: <Profile /> },
    ] }    
  ])

  const className = 'App'
  return (
    <GlobalContext.Provider value={{ darkMode, setDarkMode, userLoggedIn, setUserLoggedIn }}>
      <div className={classNames(className, darkMode && className + '_dark')} ref={root}>
        <RouterProvider router={router} />
      </div>
    </GlobalContext.Provider>
  )
}

export default App
