import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SwapiPage from '../../pages/SwapiPage.jsx'
import VotingPage from '../../pages/VotingPage.jsx'

beforeEach(() => {
  vi.restoreAllMocks()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('frontend API callouts and button clicks', () => {
  it('loads SWAPI films, renders cards, and allows save callout flow', async () => {
    // This test validates the complete happy path for the SWAPI page:
    // 1) load films by clicking the button,
    // 2) verify informational callout is shown,
    // 3) click save and verify success callout and API call payload.
    const mockFilms = [
      {
        episode_id: 4,
        title: 'A New Hope',
        director: 'George Lucas',
        producer: 'Gary Kurtz',
        opening_crawl: 'It is a period of civil war...',
        release_date: '1977-05-25',
      },
      {
        episode_id: 5,
        title: 'The Empire Strikes Back',
        director: 'Irvin Kershner',
        producer: 'Gary Kurtz, Rick McCallum',
        opening_crawl: 'It is a dark time for the Rebellion...',
        release_date: '1980-05-21',
      },
    ]

    const fetchMock = vi.spyOn(globalThis, 'fetch')
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ films: mockFilms }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ savedCount: 2 }),
      })

    const user = userEvent.setup()
    render(<SwapiPage />)

    const saveButton = screen.getByRole('button', { name: /save to supabase/i })
    expect(saveButton).toBeDisabled()

    const loadButton = screen.getByRole('button', { name: /load films/i })
    await user.click(loadButton)

    await screen.findByText('Films loaded from SWAPI.')
    expect(screen.getByText('A New Hope')).toBeInTheDocument()
    expect(screen.getByText('The Empire Strikes Back')).toBeInTheDocument()

    expect(saveButton).not.toBeDisabled()

    await user.click(saveButton)

    await screen.findByText('Saved 2 films to Supabase.')

    expect(globalThis.fetch).toHaveBeenNthCalledWith(1, '/api/swapi-films')
    expect(globalThis.fetch).toHaveBeenNthCalledWith(
      2,
      '/api/save-films',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ films: mockFilms }),
      },
    )
  })

  it('submits voting form and shows success callout', async () => {
    // This test checks form interaction, submit click behavior, and success feedback callout.
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      todo: `mock ok and json returns { success: true }`,

    })


    // TODO render VotingPage

    // TODO type Jordan into Student Name element
    // TODO type Ms. Allen into Teacher element
    // TODO type Book Collection into Gift Choice element
    // TODO type Great mentor! into Note (Optional) element

    // TODO click Submit Vote button

    // TODO find text Your vote was submitted successfully.


  })

  it('shows error callout when voting API fails', async () => {
    // This test makes sure submit failures also produce visible callout feedback.
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      todo: `mock not ok and json returns { error: 'Vote submission failed on server' }`,

    })


    // TODO render VotingPage

    // TODO type Taylor into Student Name element
    // TODO click Submit Vote button

    // TODO find text Vote submission failed on server

  })
})
