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
  const { imageName, width, height } = req.query as unknown as ImageQueryParams

  const isImageExist = await isThisFileExist(imageName + '.jpg', './src/images')
  if (!isImageExist) res.json(errors[404])

  const isImageResized = await isThisFileExist(
    `${imageName}-${width}-${height}.jpg`,
    './src/resized-images'
  )
  if (!isImageResized)
    resizeImage(imageName + '.jpg', {
      width: width as unknown as number,
      height: height as unknown as number
    })

  console.log({ imageName, isImageExist })

  res.json({ 'image-state': 'resized' })
})

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})

export default app
