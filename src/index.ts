import express, { Application, Request, Response } from 'express'
// import morgan from 'morgan'
import * as dotenv from 'dotenv'

import { ImageQueryParams } from './types/image-query-params.interface'
import { isThisFileExist } from './check-file-existence'
import { errors } from './handle-errors'
import { resizeImage } from './resize-image'

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

  const { imageName, width, height } = req.query as unknown as ImageQueryParams

  const isImageExist = await isThisFileExist(imageName + '.jpg', imagesDirectories.main)
  if (!isImageExist) {
    res.json(errors[404])
    return
  }

  // TODO: you should extract file name, width and height before searching for it in the resized dir
  const isImageResized = await isThisFileExist(
    `${imageName}-${width}-${height}.jpg`,
    imagesDirectories.resized
  )

  if (!isImageResized) {
    resizeImage(
      imageName + '.jpg',
      parseInt(width),
      parseInt(height),
      imagesDirectories.main,
      imagesDirectories.resized
    )
  }

  console.log({ imageName, isImageExist })

  res.json({ 'image-state': 'resized' })
})

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})

export default app
