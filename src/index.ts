import express, { Application, Request, Response } from 'express'
// import morgan from 'morgan'
import * as dotenv from 'dotenv'

import { ImageQueryParams } from './types/image-query-params.interface'
import { createFolderIfNotExist, isThisFileExist } from './handle-fs'
import getResponseStatus from './handle-response'
import resizeImage from './resize-image'
import ResponseStatus from './types/response.interface'
// import {  } from './handle-fs'

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
    resized: 'resized-images',
    main: 'images'
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
    __dirname + '/' + imagesDirectories.main
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

  await createFolderIfNotExist('resized-images')
  const isImageResized = await isThisFileExist(
    `${imageName}-${width}-${height}.jpg`,
    __dirname + '/' + imagesDirectories.resized
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
    .sendFile(`${__dirname}/resized-images/${imageName}-${width}-${height}.jpg`)
})

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})

export default app
