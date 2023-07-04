import { useRef, useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Game from './pages/Game'
import Login from './pages/Login'
import Register from './pages/Register'
import Instructions from './pages/Instructions'
import GlobalContext from './utils/GlobalContext'
import NavbarWrapper from './components/NavbarWrapper'
import Profile from './pages/Profile'
import AwsConfigAuth from './config/awsConfig'
import { Amplify, Hub, Auth } from 'aws-amplify'
import classNames from 'classnames'
import './App.css'

Amplify.configure({ Auth: AwsConfigAuth })

function App() {
  const [userData, setUserData] = useState(null)
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const root = useRef(null)

  useEffect(() => {
    console.log('userData', userData)
  }, [userData])

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          setUserData(data)
          setUserLoggedIn(true)
          break
        case "signOut":
          setUserData(null)
          setUserLoggedIn(false)
          break
      }
    })

    Auth.currentAuthenticatedUser()
      .then(currentUser => {
        setUserData(currentUser)
        setUserLoggedIn(true)
      })
      .catch(() => console.log("Not signed in"))

    return unsubscribe
  }, [])

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
