import { useRef } from 'react'
import { render, renderHook, screen } from '@testing-library/react'
import Board from '../components/Board'

const { result } = renderHook(() => useRef(null))

const mockProps = {
    gameActive: false,
    root: result.current,
    board: [],
    setBoard: vi.fn()
}

describe('Board', () => {
    it('should render properly', () => {
        render(<Board {...mockProps} />)
        expect(screen.getByTestId('Board')).toBeInTheDocument()
    })
})