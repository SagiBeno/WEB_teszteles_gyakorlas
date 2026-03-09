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
        todo: `insert episode 5 data here with shortened opening crawl`,

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
    // TODO render SwapiPage


    const saveButton = `TODO select Save to Supabase button`
    // TODO assert saveButton is disabled


    // TODO click Load Films button


    // TODO this assertion fails but should pass: await screen.findByText('Films loaded from SWAPI.')
    // TODO assert A New Hope is in the document
    // TODO assert episode 5 title is in the document
    
  })

  it('shows error callout on SWAPI load failure', async () => {
    // This test confirms that backend failures are surfaced to students via alert callouts.
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        todo: `mock not ok and json returns { error: 'Network unavailable' }`,        

    })


    render(<SwapiPage />)

    // TODO click Load Films button


    // TODO this assertion fails but should pass: await screen.findByText('Network unavailable')

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
