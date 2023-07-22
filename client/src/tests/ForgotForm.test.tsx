import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import ForgotForm from '../components/ForgotForm'

describe('ForgotForm', () => {
    it('should render title', () => {
        render(
            <Router>
                <ForgotForm />
            </Router>
        )
        const title = screen.getByRole('heading', { name: 'Forgot Your Password?' })
        expect(title).toBeInTheDocument()
    })
    it('should render instructions', () => {
        render(
            <Router>
                <ForgotForm />
            </Router>
        )
        const instructions = screen.getByText('Enter your Username below and we will send you a code to reset your password')
        expect(instructions).toBeInTheDocument()
    })
    it('should render username input', () => {
        render(
            <Router>
                <ForgotForm />
            </Router>
        )
        const username = screen.getByLabelText('Username')
        expect(username).toBeInTheDocument()
    })
    it('should render submit button', () => {
        render(
            <Router>
                <ForgotForm />
            </Router>
        )
        const submit = screen.getByRole('button', { name: 'Send Code' })
        expect(submit).toBeInTheDocument()
    })
    it('should render already have code button', () => {
        render(
            <Router>
                <ForgotForm />
            </Router>
        )
        const alreadyHaveCodeButton = screen.getByRole('button', { name: 'Already have a code?' })
        expect(alreadyHaveCodeButton).toBeInTheDocument()
    })
})