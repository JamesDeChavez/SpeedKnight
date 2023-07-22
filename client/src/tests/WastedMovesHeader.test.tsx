import { render, screen } from '@testing-library/react'
import WastedMovesHeader from '../components/WastedMovesHeader'

const mockWastedMoves = {
    knight: 'g7',
    pawn: 'a1',
    bestPath: 0,
    userPath: 0,
    userMoves: []
}

describe('WastedMovesHeader', () => {
    it('should render start and end positions', () => {
        render(<WastedMovesHeader selectedWastedMove={mockWastedMoves} />)
        const knightPosition = screen.getByText('Start: g7')
        const pawnPosition = screen.getByText('End: a1')
        expect(knightPosition).toBeInTheDocument()
        expect(pawnPosition).toBeInTheDocument()    
    })
    it('should render path texts', () => {
        render(<WastedMovesHeader selectedWastedMove={mockWastedMoves} />)
        const bestPath = screen.getByText('Best Path: 0')
        const userPath = screen.getByText('Your Path: 0')
        expect(bestPath).toBeInTheDocument()
        expect(userPath).toBeInTheDocument()    
    })
})