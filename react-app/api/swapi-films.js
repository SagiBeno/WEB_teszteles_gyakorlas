export default async function handler(request, response) {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const upstreamResponse = await fetch('https://swapi.info/api/films')

    if (!upstreamResponse.ok) {
      throw new Error(`SWAPI request failed with status ${upstreamResponse.status}`)
    }

    const films = await upstreamResponse.json()

    return response.status(200).json({ films })
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}
