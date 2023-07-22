import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import NewPasswordForm from '../components/NewPasswordForm'


describe('NewPasswordForm', () => {
    it('should render title', () => {
        render(
            <Router>
                <NewPasswordForm />
            </Router>
        )
        const title = screen.getByRole('heading', { name: 'Update Password' })
        expect(title).toBeInTheDocument()
    })
    it('should render instructions', () => {
        render(
            <Router>
                <NewPasswordForm />
            </Router>
        )
        const instructions = screen.getByText('Check your email for a verification code and enter below, along with your username and new password')
        expect(instructions).toBeInTheDocument()
    })
    it('should render username, code, and password inputs', () => {
        render(
            <Router>
                <NewPasswordForm/>
            </Router>
        )
        const username = screen.getByLabelText('Username')
        const code = screen.getByLabelText('Code From Email')
        const password = screen.getByLabelText('New Password')
        expect(username).toBeInTheDocument()
        expect(code).toBeInTheDocument()
        expect(password).toBeInTheDocument()
    })
    it('should render submit button', () => {
        render(
            <Router>
                <NewPasswordForm/>
            </Router>
        )
        const submit = screen.getByRole('button', { name: 'Update Password' })
        expect(submit).toBeInTheDocument()
    })
    
})
