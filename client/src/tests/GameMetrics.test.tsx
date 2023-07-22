import { render, screen } from '@testing-library/react'
import GameMetrics from '../components/GameMetrics'

const mockProps = {
    bestPath: 0,
    currPath: 0,
    wastedMoves: 0
}

describe('GameMetrics', () => {
    it('should render path metrics', () => {
        render(<GameMetrics {...mockProps} />)
        const bestPath = screen.getByText('Best Path: 0')
        const currPath = screen.getByText('Current Path: 0')
        expect(bestPath).toBeInTheDocument()
        expect(currPath).toBeInTheDocument()
    })
    it('should render wasted moves metric', () => {
        render(<GameMetrics {...mockProps} />)
        const wastedMoves = screen.getByText('Wasted: 0')
        expect(wastedMoves).toBeInTheDocument()
    })
})