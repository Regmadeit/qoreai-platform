import { render, screen, fireEvent } from '@testing-library/react'
import { QoreAiButton } from './qoreai-button'

describe('QoreAiButton', () => {
  it('renders the button with correct text', () => {
    render(<QoreAiButton />)
    expect(screen.getByText('QoreAi Assistant')).toBeInTheDocument()
  })

  it('calls openAssistant when clicked', () => {
    const mockOpenAssistant = jest.fn()
    jest.spyOn(require('@/contexts/qoreai-context'), 'useQoreAi').mockImplementation(() => ({
      openAssistant: mockOpenAssistant,
      closeAssistant: jest.fn(),
    }))

    render(<QoreAiButton />)
    fireEvent.click(screen.getByText('QoreAi Assistant'))
    expect(mockOpenAssistant).toHaveBeenCalled()
  })
}) 