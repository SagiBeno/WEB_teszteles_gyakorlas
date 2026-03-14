export function createMockRequest({ method = 'GET', body = undefined } = {}) {
  return { method, body }
}

export function createMockResponse() {
  const response = {
    statusCode: 200,
    payload: undefined,
    status(code) {
      this.statusCode = code
      return this
    },
    json(data) {
      this.payload = data
      return this
    },
  }

  return response
}
