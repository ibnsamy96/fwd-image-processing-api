import express, { Application } from 'express'
import * as dotenv from 'dotenv'

import { home, imageResizer } from './routes'

dotenv.config()

const PORT = process.env.PORT || 3000
// create an instance server
const app: Application = express()

app.get('/', home)
app.get('/resize-image', imageResizer)

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})

export default app
