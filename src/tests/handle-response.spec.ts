import { getResponseStatus } from '../handle-response'

describe('test getting response status', () => {
  it('test status message type', () => {
    const result = getResponseStatus('ACCEPTED')
    expect(result.message).toBeInstanceOf(String)
  })

  it('test status code', () => {
    const result = getResponseStatus('ACCEPTED')

    expect(result.code).toBeInstanceOf(Number)
  })
})
