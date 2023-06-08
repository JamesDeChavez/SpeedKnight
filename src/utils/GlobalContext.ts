import React from 'react'

const GlobalContext = React.createContext<{
    darkMode: boolean, 
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>,
    userLoggedIn: boolean,
    setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
}>({
    darkMode: true,
    setDarkMode: () => null,
    userLoggedIn: false,
    setUserLoggedIn: () => null,
})

export default GlobalContext