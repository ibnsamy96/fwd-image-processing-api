import sharp, { Sharp } from 'sharp'

export const resizeImage = async (
  imagePath: string,
  width: number,
  height: number,
  sourceDir: string,
  destinationDir: string
): Promise<void> => {
  console.log(imagePath)

  const [imageFileName, imageFileExtension] = imagePath.split('.')

  const imageSharpObject = sharp(`${sourceDir}/${imagePath}`)
  const resizedImageSharpObject = imageSharpObject.resize({ width, height })

  const outputInfo = await resizedImageSharpObject.toFile(
    `${destinationDir}/${imageFileName}-${width}-${height}.${imageFileExtension}`
  )
  console.log(outputInfo)
}
