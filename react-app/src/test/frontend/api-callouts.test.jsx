import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
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

    // render SwapiPage
    render(<SwapiPage />)

    // select Save to Supabase button
    const saveButton = screen.getByRole('button', { name: /save to supabase/i })

    // assert saveButton is disabled
    expect(saveButton).toBeDisabled()

    // click Load Films button
    const loadButton = screen.getByRole('button', { name: /load films/i })
    await user.click(loadButton)

    // this assertion fails but should pass: await screen.findByText('Films loaded from SWAPI.')
    await screen.findByText('Films loaded from SWAPI.')

    // assert A New Hope is in the document
    expect(screen.getByText('A New Hope')).toBeInTheDocument()

    // assert episode 5 title is in the document
    expect(screen.getByText('The Empire Strikes Back')).toBeInTheDocument()

    // Save button should now be enabled
    expect(saveButton).not.toBeDisabled()

    // click save
    await user.click(saveButton)

    // verify success callout
    await screen.findByText('Saved 2 films to Supabase.')

    // verify API calls
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


  it('shows error callout on SWAPI load failure', async () => {
    // This test confirms that backend failures are surfaced to students via alert callouts.

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Network unavailable' }),
    })

    const user = userEvent.setup()

    render(<SwapiPage />)

    // click Load Films button
    const loadButton = screen.getByRole('button', { name: /load films/i })
    await user.click(loadButton)

    // this assertion fails but should pass: await screen.findByText('Network unavailable')
    await screen.findByText('Network unavailable')
  })


  it.skip('submits voting form and shows success callout', async () => {
    // This test checks form interaction, submit click behavior, and success feedback callout.

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      todo: `mock ok and json returns { success: true }`,
    })

    // render VotingPage

    // type Jordan into Student Name element
    // type Ms. Allen into Teacher element
    // type Book Collection into Gift Choice element
    // type Great mentor! into Note (Optional) element

    // click Submit Vote button

    // find text Your vote was submitted successfully.
  })


  it.skip('shows error callout when voting API fails', async () => {
    // This test makes sure submit failures also produce visible callout feedback.

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      todo: `mock not ok and json returns { error: 'Vote submission failed on server' }`,
    })

    // render VotingPage

    // type Taylor into Student Name element
    // click Submit Vote button

    // find text Vote submission failed on server
  })

})