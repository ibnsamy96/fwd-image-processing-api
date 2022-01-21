// import supertest from 'supertest'
import { isThisFileExist } from '../handle-fs'

describe('Test file existence.', () => {
  const currentDirectory = './'
  const files = {
    exist: '.env',
    notExist: 'check-file-existence.ts'
  }

  it('test file existence', async () => {
    const result = await isThisFileExist(files.exist, currentDirectory)
    expect(result).toBe(true)
  })

  it('test file not to be exist', async () => {
    const result = await isThisFileExist(files.notExist, currentDirectory)
    expect(result).toBe(false)
  })
})
