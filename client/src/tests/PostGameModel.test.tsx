import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import PostGameModal from '../components/PostGameModal'

const mockProps = {    
    score: 0,
    setModalVisible: vi.fn(),
    userBest: 0,
    userScoresTotal: 0,
    userScoresCount: 1,
    globalBest: 0,
    globalScoresTotal: 0,
    globalScoresCount: 1,
    spinnersVisible: { user: false, global: false },
    wastedMoves: 0,
    bestPathTotal: 0,
    userPathTotal: 0
}

describe('PostGameModal', () => {
    it('should render close button', () => {
        render(
            <Router>
                <PostGameModal {...mockProps} />
            </Router>
        )
        const closeButton = screen.getByRole('button', { name: 'X' })
        expect(closeButton).toBeInTheDocument()    
    })
    it('should render title', () => {
        render(
            <Router>
                <PostGameModal {...mockProps} />
            </Router>
        )
        const title = screen.getByRole('heading', {name: 'Speed Knight Challenge'})
        expect(title).toBeInTheDocument()
    })
    it('should render both score text', () => {
        render(
            <Router>
                <PostGameModal {...mockProps} />
            </Router>
        )
        const scoreText = screen.getByText('You captured 0 pawns in 60 seconds!')
        const scoreText2 = screen.getByText('Your Score')
        expect(scoreText).toBeInTheDocument()
        expect(scoreText2).toBeInTheDocument()
    })
    it('should render user and global metrics', () => {
        render(
            <Router>
                <PostGameModal {...mockProps} />
            </Router>
        )
        const userAverage = screen.getByText('Your Average')
        const userBest = screen.getByText('Your Best')
        const globalAverage = screen.getByText('Global Average')
        const globalBest = screen.getByText('Global Best')
        expect(userAverage).toBeInTheDocument()
        expect(userBest).toBeInTheDocument()
        expect(globalAverage).toBeInTheDocument()
        expect(globalBest).toBeInTheDocument()
    })
    it('should render efficiency metrics', () => {
        render(
            <Router>
                <PostGameModal {...mockProps} />
            </Router>
        )
        const wastedMoves = screen.getByText('Wasted Moves')
        const bestAvgSteps = screen.getByText('Best Path Avg. Steps')
        const userAvgSteps = screen.getByText('Your Path Avg. Steps')
        expect(wastedMoves).toBeInTheDocument()
        expect(bestAvgSteps).toBeInTheDocument()
        expect(userAvgSteps).toBeInTheDocument()
    })
    it('should render share button', () => {
        render(
            <Router>
                <PostGameModal {...mockProps} />
            </Router>
        )
        const shareButton = screen.getByRole('button', { name: 'Share Results' })
        expect(shareButton).toBeInTheDocument()
    })
    it('should render call to action', () => {
        render(
            <Router>
                <PostGameModal {...mockProps} />
            </Router>
        )
        const loginLink = screen.getByRole('link', { name: 'Log in' })
        const registerLink = screen.getByRole('link', { name: 'create an account' })
        expect(loginLink).toBeInTheDocument()
        expect(registerLink).toBeInTheDocument()    
    })
})