import resizeImage from '../resize-image'

describe('Test resizing images', () => {
  it('image file exist', async () => {
    const result = await resizeImage('image1.jpg', 200, 400, 'images', 'thumbnails')

    expect(result).toBe(true)
  })

  it('image file not exist', async () => {
    const result = await resizeImage('not-exist-image.jpg', 200, 400, 'images', 'thumbnails')
    expect(result).toBe(false)
  })

  it('images folder not exist', async () => {
    const result = await resizeImage('image1.jpg', 200, 400, 'not-exist-folder', 'thumbnails')
    expect(result).toBe(false)
  })
})
