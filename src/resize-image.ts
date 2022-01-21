import sharp, { Sharp } from 'sharp'

export const resizeImage = async (
  imagePath: string,
  width: number,
  height: number,
  sourceDir: string,
  destinationDir: string
): Promise<{ isResizingCompleted: boolean }> => {
  let isResizingCompleted = false
  const [imageFileName, imageFileExtension] = imagePath.split('.')

  try {
    const imageSharpObject = sharp(`${sourceDir}/${imagePath}`)
    const resizedImageSharpObject = imageSharpObject.resize({ width, height })

    const outputInfo = await resizedImageSharpObject.toFile(
      `${destinationDir}/${imageFileName}-${width}-${height}.${imageFileExtension}`
    )

    isResizingCompleted = true
    console.log(outputInfo)
    // return { isImaisResizingCompletedgeResized: true }
  } catch (error) {
    console.log(error)
    isResizingCompleted = false
    // return { isImageResized: false }
  }

  return { isResizingCompleted }
}
