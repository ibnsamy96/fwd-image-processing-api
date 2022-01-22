import getResponseStatus from '../handle-response'

describe('test getting response status', () => {
  it('test status message type', () => {
    const result = getResponseStatus('OK')
    expect(result.message).toBeInstanceOf(String)
  })

  it('test status code', () => {
    const result = getResponseStatus('OK')

    expect(result.code).toBeInstanceOf(Number)
  })
})
