import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Navbar from '../components/Navbar'

describe('Navbar', () => {
    it('should render header title', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        )
        const headerTitle = screen.getByRole('heading', { name: 'Speed Knight Challenge'})
        expect(headerTitle).toBeInTheDocument()
    })
    it('should render hamburger button', () => {
        render(
            <Router>
                <Navbar />
            </Router>
        )
        const hamburgerButton = screen.getByRole('button', { name: 'Navbar Button' })
        expect(hamburgerButton).toBeInTheDocument()
    })
    it('should render nav buttons when user clicks hamburger button', async () => {
        render(
            <Router>
                <Navbar />
            </Router>
        )
        const hamburgerButton = screen.getByRole('button', { name: 'Navbar Button' })
        userEvent.click(hamburgerButton)

        const lightModeToggle = await screen.findByRole('button', { name: 'Light / Dark' })
        const instructionsButton = await screen.findByRole('link', { name: 'How to Play' })
        const loginButton = await screen.findByRole('link', { name: 'Log In' })
        const registerButton = await screen.findByRole('link', { name: 'Create Account' })

        expect(lightModeToggle).toBeInTheDocument()
        expect(instructionsButton).toBeInTheDocument()
        expect(loginButton).toBeInTheDocument()
        expect(registerButton).toBeInTheDocument()
    })
})