import { render, renderHook, screen } from '@testing-library/react'
import { useRef } from 'react'
import Game from '../pages/Game'


const { result } = renderHook(() => useRef(null))

describe('Game Page', () => {
    it('should render game instructions', () => {
        render(<Game root={result.current} />)
        const instructions = screen.getByText('Game Rules:')
        expect(instructions).toBeInTheDocument()
    })
    it('should render start button', () => {
        render(<Game root={result.current} />)
        const startButton = screen.getByRole('button', { name: 'Start Game' })
        expect(startButton).toBeInTheDocument()
    })
})