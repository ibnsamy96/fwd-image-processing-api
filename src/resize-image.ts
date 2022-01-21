import sharp, { Sharp } from 'sharp'

export const resizeImage = async (
  imagePath: string,
  width: number,
  height: number,
  sourceDir: string,
  destinationDir: string
): Promise<boolean> => {
  let isResizingCompleted = false
  const [imageFileName, imageFileExtension] = imagePath.split('.')
  console.log(imagePath)

  try {
    const imageSharpObject = sharp(`${sourceDir}ss/${imagePath}`)
    const resizedImageSharpObject = imageSharpObject.resize({ width, height })

    const outputInfo = await resizedImageSharpObject.toFile(
      `${destinationDir}/${imageFileName}-${width}-${height}.${imageFileExtension}`
    )

    isResizingCompleted = true
    console.log(outputInfo)
  } catch (error) {
    console.log("'resizeImage' function:", error)
    isResizingCompleted = false
  }

  return isResizingCompleted
}
