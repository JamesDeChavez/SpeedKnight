import React from 'react'

const GlobalContext = React.createContext<{
    darkMode: boolean, 
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>,
    userLoggedIn: boolean,
    setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
    userData: any
}>({
    darkMode: true,
    setDarkMode: () => null,
    userLoggedIn: false,
    setUserLoggedIn: () => null,
    userData: null
})

export default GlobalContext