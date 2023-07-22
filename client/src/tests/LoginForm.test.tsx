import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

describe('LoginForm', () => {
    it('should render title', () => {
        render(
            <Router>
                <LoginForm />
            </Router>
        )
        const title = screen.getByRole('heading', { name: 'Log in' })
        expect(title).toBeInTheDocument()
    })
    it('should render username and password inputs', () => {
        render(
            <Router>
                <LoginForm />
            </Router>
        )
        const username = screen.getByLabelText('Username')
        const password = screen.getByLabelText('Password')
        expect(username).toBeInTheDocument()
        expect(password).toBeInTheDocument()
    })
    it('should render submit button', () => {
        render(
            <Router>
                <LoginForm />
            </Router>
        )
        const submit = screen.getByRole('button', { name: 'Log in' })
        expect(submit).toBeInTheDocument()
    })
    it('should render forgot password link', () => {
        render(
            <Router>
                <LoginForm />
            </Router>
        )
        const forgotButton = screen.getByRole('button', { name: 'Forgot Password?' })
        expect(forgotButton).toBeInTheDocument()
    })
    it('should render Google signin button', () => {
        render(
            <Router>
                <LoginForm/>
            </Router>
        )
        const googleButton = screen.getByRole('button', { name: 'Sign in with Google' })
        expect(googleButton).toBeInTheDocument()
    })
})