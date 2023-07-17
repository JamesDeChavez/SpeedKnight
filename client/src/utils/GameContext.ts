import React from 'react'
import { Audit } from './interfaces'

const GameContext = React.createContext<{
    soundOn: boolean,
    setOptionsVisible: React.Dispatch<React.SetStateAction<boolean>>,
    markersOn: boolean,
    score: number,
    setScore: React.Dispatch<React.SetStateAction<number>>,
    bestPath: number,
    setBestPath: React.Dispatch<React.SetStateAction<number>>,
    currPath: number,
    setCurrPath: React.Dispatch<React.SetStateAction<number>>,
    wastedMoves: number,
    setWastedMoves: React.Dispatch<React.SetStateAction<number>>,
    setBestPathTotal: React.Dispatch<React.SetStateAction<number>>,
    setUserPathTotal: React.Dispatch<React.SetStateAction<number>>,
    audit: Audit[],
    setAudit: React.Dispatch<React.SetStateAction<Audit[]>>
}>({
    soundOn: true,
    setOptionsVisible: () => {},
    markersOn: true,
    score: 0,
    setScore: () => {},
    bestPath: 0,
    setBestPath: () => {},
    currPath: 0,
    setCurrPath: () => {},
    wastedMoves: 0,
    setWastedMoves: () => {},
    setBestPathTotal: () => {},
    setUserPathTotal: () => {},
    audit: [],
    setAudit: () => {}
})


export default GameContext