import supertest from 'supertest'
import app from '../index'

// create a request object
const request = supertest(app)

describe("Test endpoint '/'", () => {
  it('test response', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
})

describe("Test endpoint '/resize-image'", () => {
  const endpoint = '/resize-image'

  it('test ok', async () => {
    const queriesLine = 'imageName=image1&width=200&height=500'
    const response = await request.get(`${endpoint}?${queriesLine}`)
    expect(response.status).toBe(200)
  })

  it('test bad requests due to string parameters', async () => {
    const queriesLine = 'imageName=image1&width=100px&height=500px'
    const response = await request.get(`${endpoint}?${queriesLine}`)
    expect(response.status).toBe(400)
  })

  it('test not enough query parameters', async () => {
    const queriesLine = 'imageName=image1j&width=100&height=500'
    const response = await request.get(`${endpoint}?${queriesLine}`)
    expect(response.status).toBe(404)
  })
})
