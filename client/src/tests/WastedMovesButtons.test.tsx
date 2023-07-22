import { render, screen } from '@testing-library/react'
import WastedMovesButtons from '../components/WastedMovesButtons'

const mockProps = {
    gameActive: false,
    wastedMovesIdx: 0,
    selectedWastedMove: {
        knight: 'g7',
        pawn: 'a1',
        bestPath: 0,
        userPath: 0,
        userMoves: []
    },
    setBoard: vi.fn(),
    setWastedMovesIdx: vi.fn()
}

describe('WastedMovesButtons', () => {
    it('should render label text', () => {
        render(<WastedMovesButtons {...mockProps} />)
        expect(screen.getByText('Your Moves')).toBeInTheDocument()
    })
    it('should render left and right button', () => {
        render(<WastedMovesButtons {...mockProps} />)
        expect(screen.getByTestId('leftWastedArrow')).toBeInTheDocument()
        expect(screen.getByTestId('rightWastedArrow')).toBeInTheDocument()
    })    
})