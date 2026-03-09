import { act, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import App from '../../App.jsx'
import LampPage from '../../pages/LampPage.jsx'

describe('frontend routing and click behavior', () => {
  it('renders the core left menu and home content on initial route', () => {
    // This test verifies top-level component existence so we know app bootstrap is correct.
    // The assertions intentionally check navigation labels and home text for clarity.
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    // TODO assert Student Functions Lab is in the document
    // TODO assert a link named Home is in the document
    // TODO assert a link named SWAPI is in the document
    // TODO assert a link named Traffic Lamp is in the document
    // TODO assert a link named Voting is in the document
    // TODO assert Welcome is in the document

  })

  it('navigates to SWAPI page when SWAPI menu item is clicked', async () => {
    // This test validates client-side redirection behavior performed by React Router.
    // A user click on the menu item should replace page content with SWAPI content.
    const user = userEvent.setup()

    // TODO render

    // TODO this assertion fails but should pass: await user.click(screen.getByRole('link', { name: 'SWAPI' }))

    // TODO this assertion fails but should pass: expect(screen.getByRole('heading', { name: 'SWAPI Films' })).toBeInTheDocument()
  })

  it('navigates to Voting page and exposes form controls', async () => {
    // This test ensures click navigation reaches the voting route and key form elements exist.




    // TODO test clicks on Voting link

    // TODO assert heading named Teacher Birthday Voting is in the document
    // TODO assert Student Name is in the document
    // TODO assert Teacher is in the document
    // TODO assert Gift Choice is in the document

  })

  it('starts and stops lamp stage animation when control buttons are clicked', async () => {
    // This test focuses on click interactions and confirms that lamp stage classes change.
    // Fake timers are used because stage changes are time-driven via setInterval.
    vi.useFakeTimers()
    render(<LampPage />)

    const redLamp = screen.getByLabelText('red lamp')
    const yellowLamp = `TODO select yellow lamp`

    expect(redLamp).toHaveClass('active')
    // TODO assert yellow lamp is not active yet


    fireEvent.click(screen.getByRole('button', { name: 'Start' }))
    act(() => {
      vi.advanceTimersByTime(1700)
    })

    // TODO assert red lamp is still active

    // TODO assert yellow lamp is active


    // TODO press Stop button

    const classSnapshot = yellowLamp.className

    act(() => {
      vi.advanceTimersByTime(3400)
    })
    expect(yellowLamp.className).toBe(classSnapshot)

    vi.useRealTimers()
  })

  it('shows all feature callout cards on home page', () => {
    // This test verifies presence of informational callout cards for students.


    // TODO this assertion fails but should pass: const section = screen.getByText('Welcome').closest('section')
    // TODO this assertion fails but should pass: const scope = within(section)

    // TODO this assertion fails but should pass: expect(scope.getByText('SWAPI')).toBeInTheDocument()
    // TODO assert Lamp is in the document
    // TODO assert Voting is in the document

  })
})
