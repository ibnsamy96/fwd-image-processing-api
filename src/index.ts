import express, { Application, Request, Response } from 'express'
// import morgan from 'morgan'
import * as dotenv from 'dotenv'

import { ImageQueryParams } from './types/image-query-params.interface'
import { isThisFileExist } from './check-file-existence'
import { getResponseStatus } from './handle-response'
import { resizeImage } from './resize-image'
import { ResponseStatus } from './types/response.interface'

dotenv.config()

const PORT = process.env.PORT || 3000
// create an instance server
const app: Application = express()
// HTTP request logger middleware
// app.use(morgan('short'))

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  })
})

app.get('/resize-image', async (req: Request, res: Response) => {
  const imagesDirectories = {
    resized: './src/resized-images',
    main: './src/images'
  }

  const { imageName } = req.query as unknown as ImageQueryParams
  let { width, height } = req.query as unknown as ImageQueryParams

  const isImageExist = await isThisFileExist(imageName + '.jpg', imagesDirectories.main)
  if (!isImageExist) {
    // if there is no image, tell the user
    const responseStatus: ResponseStatus = getResponseStatus('NOT_FOUND')
    res.status(responseStatus.code).send({ error: responseStatus.message, 'image-name': imageName })
    return
  }

  if (!width || !height || isNaN(Number(width)) || isNaN(Number(height))) {
    // if width or height aren't defined, tell the user
    const responseStatus: ResponseStatus = getResponseStatus('BAD_REQUEST')
    res
      .status(responseStatus.code)
      .send({ error: responseStatus.message, 'received-width': width, 'received-height': height })
    return
  }

  // TODO: you should extract file name, width and height before searching for it in the resized dir
  const isImageResized = await isThisFileExist(
    `${imageName}-${width}-${height}.jpg`,
    imagesDirectories.resized
  )

  if (!isImageResized) {
    const isResizingCompleted = await resizeImage(
      imageName + '.jpg',
      parseInt(width),
      parseInt(height),
      imagesDirectories.main,
      imagesDirectories.resized
    )

    if (!isResizingCompleted) {
      const responseStatus: ResponseStatus = getResponseStatus('INTERNAL_SERVER_ERROR')
      res.status(responseStatus.code).send({ error: responseStatus.message })
      return
    }
  }

  const responseStatus: ResponseStatus = getResponseStatus('OK')
  // res.status(responseStatus.code).send({ succeeded: responseStatus.message })
  res
    .status(responseStatus.code)
    .sendFile(__dirname + '/resized-images/' + imageName + '-' + width + '-' + height + '.jpg')
})

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})

export default app
