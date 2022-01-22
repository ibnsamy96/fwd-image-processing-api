import { Request, Response } from 'express'
import path from 'path'

import { ImageQueryParams } from './types/image-query-params.interface'
import ResponseStatus from './types/response.interface'

import { createFolderIfNotExist, isThisFileExist } from './handle-fs'
import getResponseStatus from './handle-response'
import resizeImage from './resize-image'
import validateQueryParams from './validate-query-params'

const home = (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  })
}

const imageResizer = async (req: Request, res: Response) => {
  const imagesDirectories = {
    resized: ['..', 'public', 'thumbnails'],
    main: ['..', 'public', 'images']
  }

  const { filename: imageName } = req.query as unknown as ImageQueryParams
  const { width, height } = req.query as unknown as ImageQueryParams

  const queriesValidationResult = await validateQueryParams(
    imageName,
    width,
    height,
    imagesDirectories
  )

  if (!queriesValidationResult.isQueriesValid) {
    res.status(queriesValidationResult.responseStatus?.code as unknown as number).send({
      error: queriesValidationResult.responseStatus?.message,
      ...queriesValidationResult.extraValues
    })
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
}

export { home, imageResizer }
