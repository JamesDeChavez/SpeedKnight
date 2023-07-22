import { render, screen } from '@testing-library/react'
import GameOptions from '../components/GameOptions'

const mockProps = {
    soundOn: true, setSoundOn: vi.fn(),
    markersOn: true, setMarkersOn: vi.fn(),
    optionsVisible: true, setOptionsVisible: vi.fn()
}

describe('GameOptions', () => {
    it('should render options toggle', () => {
        render(<GameOptions {...mockProps} />)
        const optionsToggle = screen.getByText('Options')
        expect(optionsToggle).toBeInTheDocument()
    })
    it('should render sound and markers options', () => {
        render(<GameOptions {...mockProps} />)
        const soundOption = screen.getByText('Sound')
        const markersOption = screen.getByText('Red Markers')
        const onButtons = screen.getAllByRole('button', { name: 'On' })
        const offButtons = screen.getAllByRole('button', { name: 'Off' })
        expect(soundOption).toBeInTheDocument()
        expect(markersOption).toBeInTheDocument()
        expect(onButtons.length).toBe(2)
        expect(offButtons.length).toBe(2)
    })
})