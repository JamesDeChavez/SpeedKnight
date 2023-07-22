import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom' 
import Instructions from '../pages/Instructions'

describe('Instructions', () => {
    it('should render instructions title', () => {
        render(
            <Router>
                <Instructions />
            </Router>
        )
        const title = screen.getByRole('heading', { name: 'How To Play'})
        expect(title).toBeInTheDocument()
    })
    it('should render instructions', () => {
        render(
            <Router>
                <Instructions />
            </Router>
        )
        const instructionsOne = screen.getByText('Capture as many pawns as you can')
        const instructionsTwo = screen.getByText('Pawns randomly appear on the board')
        const instructionsThree = screen.getByText('You have 60 second to capture as many pawns as you can')
        const instructionsFour = screen.getByText('The color of the chess board tiles will turn red if it is a valid move for your knight')
        const instructionsFive = screen.getByText('Each red tile above represents a valid move you can click')
        const instructions = [instructionsOne, instructionsTwo, instructionsThree, instructionsFour, instructionsFive]
        instructions.forEach(instruction => {
            expect(instruction).toBeInTheDocument()
        })    
    })
    it('should render call to action', () => {
        render(
            <Router>
                <Instructions />
            </Router>
        )
        const loginLink = screen.getByRole('link', { name: 'Log in'})
        const registerLink = screen.getByRole('link', { name: 'create an account'})
        expect(loginLink).toBeInTheDocument()
        expect(registerLink).toBeInTheDocument()
    })
})