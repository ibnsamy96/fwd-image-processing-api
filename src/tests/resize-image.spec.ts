import resizeImage from '../resize-image'

describe('Test resizing images', () => {
  it('image file exist', async () => {
    const result = await resizeImage(
      'image1.jpg',
      200,
      400,
      ['..', 'public', 'images'],
      ['..', 'public', 'thumbnails']
    )

    expect(result).toBe(true)
  })

  it('image file not exist', async () => {
    const result = await resizeImage(
      'not-exist-image.jpg',
      200,
      400,
      ['..', 'public', 'images'],
      ['..', 'public', 'thumbnails']
    )
    expect(result).toBe(false)
  })

  it('images folder not exist', async () => {
    const result = await resizeImage(
      'image1.jpg',
      200,
      400,
      ['..', 'public', 'not-exist-folder'],
      ['..', 'public', 'thumbnails']
    )
    expect(result).toBe(false)
  })
})
