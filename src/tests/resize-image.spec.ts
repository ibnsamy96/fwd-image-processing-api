import { resizeImage } from '../resize-image'

describe('Test resizing images', () => {
  it('image file exist', async () => {
    const result = await resizeImage(
      'image1.jpg',
      200,
      400,
      './src/images/',
      './src/resized-images/'
    )
    console.log(result)

    expect(result).toBe(true)
  })

  it('image file not exist', async () => {
    const result = await resizeImage(
      'image2.jpg',
      200,
      400,
      './src/images/',
      './src/resized-images/'
    )
    expect(result).toBe(false)
  })

  it('images folder not exist', async () => {
    const result = await resizeImage(
      'image1.jpg',
      200,
      400,
      './src/not-exist-folder/',
      './src/resized-images/'
    )
    expect(result).toBe(false)
  })
})
