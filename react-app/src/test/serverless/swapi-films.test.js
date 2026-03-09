// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest'
import handler from '../../../api/swapi-films.js'
import { createMockRequest, createMockResponse } from '../utils/mockVercelReqRes.js'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('api/swapi-films handler', () => {
  it('returns 405 when the request method is not GET', async () => {
    // This test verifies request guarding so unsupported methods are rejected early.
    const request = `TODO call createMockRequest with a POST instead of GET`
    const response = createMockResponse()

    // TODO call swapi-films serverless function

    // TODO assert status code is 405

    // TODO assert payload is { error: 'Method not allowed' }

  })

  it('returns films from SWAPI when upstream succeeds', async () => {
    // This test mocks the upstream SWAPI call and asserts the handler forwards data.
    const mockFilms = [{ episode_id: 4, title: 'A New Hope' }]

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      todo: `mock ok field and async json()`,

    })

    const request = `TODO call createMockRequest with GET`
    const response = createMockResponse()

    // TODO call swapi-films serverless function

    // TODO this assertion fails but should pass: expect(globalThis.fetch).toHaveBeenCalledWith('https://swapi.info/api/films')
    // TODO assert status code is 200
    // TODO this assertion fails but should pass: expect(response.payload).toEqual({ films: mockFilms })
  })

  it('returns 500 when upstream returns a non-ok response', async () => {
    // This test ensures that upstream failures are converted into API error responses.
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      todo: `mock ok field, status=502 and async json()`,

    })

    const request = `TODO call createMockRequest with GET`
    const response = createMockResponse()

    // TODO call swapi-films serverless function

    // TODO assert status code is >= 500
    // TODO assert payload.error contains "failed with status 502"

  })
})
