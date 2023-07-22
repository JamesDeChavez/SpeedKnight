import { render, screen } from '@testing-library/react'
import ScoreTimeHeader from '../components/ScoreTimeHeader'

describe('ScoreTimeHeader', () => {
    it('should render score and time', () => {
        render(<ScoreTimeHeader score={10} time={10} />)
        expect(screen.getByText('Score: 10')).toBeInTheDocument()
        expect(screen.getByText('Time: 10')).toBeInTheDocument()
    })    
})