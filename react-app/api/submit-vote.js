export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const vote = request.body

    if (!vote?.studentName) {
      return response.status(400).json({ error: 'Student name is required' })
    }

    return response.status(200).json({ success: true })
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}