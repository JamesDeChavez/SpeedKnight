import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import VerifyForm from '../components/VerifyForm'

describe('VerifyForm', () => {
    it('should render title', () => {
        render(
            <Router>
                <VerifyForm />
            </Router>
        )
        const title = screen.getByRole('heading', { name: 'Verify Email' })
        expect(title).toBeInTheDocument()
    })
    it('should render instructions', () => {
        render(
            <Router>
                <VerifyForm />
            </Router>
        )
        const instructions = screen.getByText('Check your email for a verification code and enter below')
        expect(instructions).toBeInTheDocument()
    })
    it('should render username and code inputs', () => {
        render(
            <Router>
                <VerifyForm />
            </Router>
        )
        const username = screen.getByLabelText('Username')
        const code = screen.getByLabelText('Verify Code')
        expect(username).toBeInTheDocument()
        expect(code).toBeInTheDocument()
    })
    it('should render resend button', () => {
        render(
            <Router>
                <VerifyForm />
            </Router>
        )
        const resend = screen.getByRole('button', { name: 'Resend Code' })
        expect(resend).toBeInTheDocument()
    })
    it('should render submit button', () => {
        render(
            <Router>
                <VerifyForm />
            </Router>
        )
        const submitButton = screen.getByRole('button', { name: 'Verify username' })
        expect(submitButton).toBeInTheDocument()
    })
    
})