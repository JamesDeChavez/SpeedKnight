import React from 'react'

const GlobalContext = React.createContext<{
    darkMode: boolean, 
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}>({
    darkMode: true,
    setDarkMode: () => null,
})

export default GlobalContext