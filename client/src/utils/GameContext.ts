import React from 'react'

const GameContext = React.createContext<{
    soundOn: boolean,
    setOptionsVisible: React.Dispatch<React.SetStateAction<boolean>>,
    markersOn: boolean
}>({
    soundOn: true,
    setOptionsVisible: () => {},
    markersOn: true
})

export default GameContext