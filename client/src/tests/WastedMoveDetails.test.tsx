import { render, screen } from '@testing-library/react'
import WastedMoveDetails from '../components/WastedMoveDetails'

const mockProps = {
    gameActive: false,
    wastedMovesVisible: false,
    setWastedMovesVisible: vi.fn(),
    wastedMovesData: [],
    setBoard: vi.fn(),
    selectedWastedMove: null,
    setSelectedWastedMove: vi.fn(),
    setWastedMovesIdx: vi.fn()

}

describe('WastedMoveDetails', () => {
    it('should render wasted moves toggle', () => {
        render(<WastedMoveDetails {...mockProps} />)
        const wastedToggle = screen.getByText('Wasted Moves Details')
        expect(wastedToggle).toBeInTheDocument()
    })
    it('should render TBD text if no wasted moves data is passed in props', () => {
        render(<WastedMoveDetails {...mockProps} />)
        const tbdText = screen.getByText('Your inefficient moves will appear here for review')
        expect(tbdText).toBeInTheDocument()    
    })
    it('should render wasted move text if passed in props', () => {
        const mockWastedMovesData = [{
            knight: 'g7',
            pawn: 'f5',
            bestPath: 1,
            userPath: 3,
            userMoves: ['g7', 'e6', 'g7', 'f5']
        }]
        render(<WastedMoveDetails {...mockProps} wastedMovesData={mockWastedMovesData} />)
        const knightText = screen.getByText('Knight: g7')
        const pawnText = screen.getByText('Pawn: f5')
        const bestPathText = screen.getByText('Best Path: 1')
        const userPathText = screen.getByText('Your Path: 3')
        const userMovesText = screen.getByText('Your Moves: g7, e6, g7, f5')
        expect(knightText).toBeInTheDocument()
        expect(pawnText).toBeInTheDocument()
        expect(bestPathText).toBeInTheDocument()
        expect(userPathText).toBeInTheDocument()
        expect(userMovesText).toBeInTheDocument()
    })
})