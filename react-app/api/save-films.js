export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { films } = request.body

    if (!Array.isArray(films)) {
      return response.status(400).json({ error: 'Films array is required' })
    }

    return response.status(200).json({ savedCount: films.length })
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}