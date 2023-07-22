import { render, screen } from '@testing-library/react'
import Space from '../components/Space'

const mockKnightPosition: [number, number] = [0, 0]

const mockProps = {
    space: {
        backgroundColor: 'red',
        knightVisible: true,
        pawnVisible: false,
        validMove: false
    },
    row: 0,
    col: 0,
    board: [],
    setBoard: vi.fn(),
    knightPosition: mockKnightPosition,
    setKnightPosition: vi.fn(),
    validMoves: [],
    setValidMoves: vi.fn()
}

describe('Space', () => {
    it('should render properly', () => {
        render(<Space {...mockProps} />)
        expect(screen.getByTestId('BoardSpace')).toBeInTheDocument()
    })
})