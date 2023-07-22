import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Profile from '../pages/Profile'

describe('Profile', () => {
    it('should render title', () => {
        render(
            <Router>
                <Profile />
            </Router>        
        )
        const title = screen.getByRole('heading', { name: 'Profile' })
        expect(title).toBeInTheDocument()
    })
    it('should render edit button', () => {
        render(
            <Router>
                <Profile />
            </Router>
        )
        const editButton = screen.getByRole('button', { name: 'Edit' })
        expect(editButton).toBeInTheDocument()
    })
    it('should render username input', () => {
        render(
            <Router>
                <Profile/>
            </Router>
        )
        const usernameInput = screen.getByLabelText('Username')
        expect(usernameInput).toBeInTheDocument()
    })
    it('should render email', () => {
        render(
            <Router>
                <Profile/>
            </Router>
        )
        const email = screen.getByText('Email')
        expect(email).toBeInTheDocument()
    })
    it('should render delete button', () => {
        render(
            <Router>
                <Profile/>
            </Router>
        )
        const deleteButton = screen.getByRole('button', { name: 'Delete Account' })
        expect(deleteButton).toBeInTheDocument()
    })
})