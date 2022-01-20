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
      // output.png is a 200 pixels wide and 300 pixels high image
      // containing a nearest-neighbour scaled version
      // contained within the north-east corner of a semi-transparent white canvas
      console.log(data)
    })
}
