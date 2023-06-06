import { useRef, useState } from 'react'
import Game from './pages/Game'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Instructions from './pages/Instructions'
import './App.css'
import GlobalContext from './utils/GlobalContext'
import classNames from 'classnames'
import NavbarWrapper from './components/NavbarWrapper'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const root = useRef(null)

  const router = createBrowserRouter([
    { path: '/', element: <NavbarWrapper />, children: [
      { path: '/', element: <Game root={root} /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/instructions', element: <Instructions /> },
    ] }    
  ])

  const className = 'App'
  return (
    <GlobalContext.Provider value={{ darkMode, setDarkMode }}>
      <div className={classNames(className, darkMode && className + '_dark')} ref={root}>
        <RouterProvider router={router} />
      </div>
    </GlobalContext.Provider>
  )
}

export default App
