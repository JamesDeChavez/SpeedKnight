import React from 'react'

const GameContext = React.createContext<{
    soundOn: boolean,
    setOptionsVisible: React.Dispatch<React.SetStateAction<boolean>>,
    markersOn: boolean,
    setScore: React.Dispatch<React.SetStateAction<number>>,
    bestPath: number,
    setBestPath: React.Dispatch<React.SetStateAction<number>>,
    currPath: number,
    setCurrPath: React.Dispatch<React.SetStateAction<number>>,
    setWastedMoves: React.Dispatch<React.SetStateAction<number>>,
    setBestPathTotal: React.Dispatch<React.SetStateAction<number>>,
    setUserPathTotal: React.Dispatch<React.SetStateAction<number>>,
}>({
    soundOn: true,
    setOptionsVisible: () => {},
    markersOn: true,
    setScore: () => {},
    bestPath: 0,
    setBestPath: () => {},
    currPath: 0,
    setCurrPath: () => {},
    setWastedMoves: () => {},
    setBestPathTotal: () => {},
    setUserPathTotal: () => {},
})


export default GameContext