import express, { Application, Request, Response } from 'express'
import path from 'path'
import * as dotenv from 'dotenv'

import { createFolderIfNotExist, isThisFileExist } from './handle-fs'
import getResponseStatus from './handle-response'
import resizeImage from './resize-image'

import { ImageQueryParams } from './types/image-query-params.interface'
import ResponseStatus from './types/response.interface'

dotenv.config()

const PORT = process.env.PORT || 3000
// create an instance server
const app: Application = express()

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  })
})

app.get('/resize-image', async (req: Request, res: Response) => {
  const imagesDirectories = {
    resized: ['..', 'public', 'thumbnails'],
    main: ['..', 'public', 'images']
  }

  const { filename: imageName } = req.query as unknown as ImageQueryParams
  const { width, height } = req.query as unknown as ImageQueryParams

  if (!imageName) {
    // if image name aren't defined, tell the user
    const responseStatus: ResponseStatus = getResponseStatus('BAD_REQUEST')
    res.status(responseStatus.code).send({
      error: responseStatus.message,
      'received-imageName': imageName
    })
    return
  }

  const isImageExist = await isThisFileExist(
    `${imageName}.jpg`,
    path.join(__dirname, ...imagesDirectories.main)
  )
  if (!isImageExist) {
    // if there is no image, tell the user
    const responseStatus: ResponseStatus = getResponseStatus('NOT_FOUND')
    res
      .status(responseStatus.code)
      .send({ error: responseStatus.message, 'received-imageName': imageName })
    return
  }

  if (!width || !height || Number.isNaN(Number(width)) || Number.isNaN(Number(height))) {
    // if width or height aren't defined, tell the user
    const responseStatus: ResponseStatus = getResponseStatus('BAD_REQUEST')
    res
      .status(responseStatus.code)
      .send({ error: responseStatus.message, 'received-width': width, 'received-height': height })
    return
  }

  await createFolderIfNotExist(...imagesDirectories.resized)
  const isImageResized = await isThisFileExist(
    `${imageName}-${width}-${height}.jpg`,
    path.join(__dirname, ...imagesDirectories.resized)
  )

  if (!isImageResized) {
    const isResizingCompleted = await resizeImage(
      `${imageName}.jpg`,
      parseInt(width, 10),
      parseInt(height, 10),
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
  res
    .status(responseStatus.code)
    .sendFile(
      path.join(__dirname, ...imagesDirectories.resized, `${imageName}-${width}-${height}.jpg`)
    )
})

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})

export default app
