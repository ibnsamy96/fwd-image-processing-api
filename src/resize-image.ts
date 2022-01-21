import sharp from 'sharp'
import { createFolderIfNotExist } from './handle-fs'

const resizeImage = async (
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
    const imageSharpObject = sharp(`${sourceDir}/${imagePath}`)
    const resizedImageSharpObject = imageSharpObject.resize({ width, height })

    createFolderIfNotExist('resized-images')

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

export default resizeImage
