import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'

describe('RegisterForm', () => {
    it('should render title', () => {
        render(
            <Router>
                <RegisterForm/>
            </Router>
        )
        const title = screen.getByRole('heading', {name: 'Create Account'})
        expect(title).toBeInTheDocument()
    })
    it('should render username, email, and two password inputs', () => {
        render(
            <Router>
                <RegisterForm/>
            </Router>
        )
        const username = screen.getByLabelText('Username')
        const email = screen.getByLabelText('Email')
        const password = screen.getByLabelText('Password')
        const repeatPassword = screen.getByLabelText('Repeat Password')
        expect(username).toBeInTheDocument()
        expect(email).toBeInTheDocument()
        expect(password).toBeInTheDocument()
        expect(repeatPassword).toBeInTheDocument()
    })
    it('should render a register button', () => {
        render(
            <Router>
                <RegisterForm/>
            </Router>
        )
        const registerButton = screen.getByRole('button', {name: 'Register'})
        expect(registerButton).toBeInTheDocument()    
    })
    it('should render a Google button', () => {
        render(
            <Router>
                <RegisterForm/>
            </Router>
        )
        const googleButton = screen.getByRole('button', {name: 'Register with Google'})
        expect(googleButton).toBeInTheDocument()
    })
})