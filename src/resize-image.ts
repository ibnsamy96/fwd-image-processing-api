import sharp from 'sharp'

const resizeImage = async (
  imagePath: string,
  width: number,
  height: number,
  sourceDir: string,
  destinationDir: string
): Promise<boolean> => {
  let isResizingCompleted = false
  const [imageFileName, imageFileExtension] = imagePath.split('.')

  // console.log(imagePath)

  try {
    const imageSharpObject = sharp(`${__dirname}\\${sourceDir}\\${imagePath}`)
    const resizedImageSharpObject = imageSharpObject.resize({ width, height })

    console.log('getting into the output info')
    const absoluteImagePath = `${__dirname}\\${destinationDir}\\${imageFileName}-${width}-${height}.${imageFileExtension}`
    // console.log(absoluteImagePath)

    const outputInfo = await resizedImageSharpObject.toFile(absoluteImagePath)

    isResizingCompleted = true
    // console.log(outputInfo)
  } catch (error) {
    console.log("'resizeImage' function:", error)
    isResizingCompleted = false
  }

  return isResizingCompleted
}

export default resizeImage
