import { useRef } from 'react'
import Navbar from './components/Navbar'
import Game from './pages/Game'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'
import Instructions from './pages/Instructions'



function App() {
  const root = useRef(null)

  const router = createBrowserRouter([
    { path: '/', element: <Game root={root} /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/instructions', element: <Instructions /> },
  ])

  const className = 'App'
  return (
    <div className={className} ref={root}>
      <Navbar />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
