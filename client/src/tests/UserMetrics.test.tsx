import { render, screen } from '@testing-library/react'
import UserMetrics from '../components/UserMetrics'

describe('UserMetrics', () => {
    it('should render title', () => {
        render(<UserMetrics />)
        const title = screen.getByRole('heading', { name: 'Your Metrics' })
        expect(title).toBeInTheDocument()
    })
    it('should render last game, average, and best metrics', () => {
        render(<UserMetrics />)
        const lastGame = screen.getByText('Last Game')
        const average = screen.getByText('Average')
        const best = screen.getByText('Best')
        expect(lastGame).toBeInTheDocument()
        expect(average).toBeInTheDocument()
        expect(best).toBeInTheDocument()
    })
})