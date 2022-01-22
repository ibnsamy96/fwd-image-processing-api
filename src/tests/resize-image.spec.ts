import resizeImage from '../resize-image'

describe('Test resizing images', () => {
  it('image file exist', async () => {
    const result = await resizeImage('image1.jpg', 200, 400, 'images', 'resized-images')

    expect(result).toBe(true)
  })

  it('image file not exist', async () => {
    const result = await resizeImage('image2.jpg', 200, 400, 'images', 'resized-images')
    expect(result).toBe(false)
  })

  it('images folder not exist', async () => {
    const result = await resizeImage('image1.jpg', 200, 400, 'not-exist-folder', 'resized-images')
    expect(result).toBe(false)
  })
})
