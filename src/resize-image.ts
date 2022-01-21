import sharp, { Sharp } from 'sharp'

export const resizeImage = (
  imagePath: string,
  width: number,
  height: number,
  sourceDir: string,
  destinationDir: string
) => {
  console.log(imagePath)

  const [imageFileName, imageFileExtension] = imagePath.split('.')

  const imageSharpObject = sharp(`${sourceDir}/${imagePath}`)
    .resize({ width, height })
    .toFile(`${destinationDir}/${imageFileName}-${width}-${height}.${imageFileExtension}`)
    .then((data) => {
      console.log(data)
    })
}
