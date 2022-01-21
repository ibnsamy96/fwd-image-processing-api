import { StatusCodes } from 'http-status-codes'

import ResponseStatus from './types/response.interface'

const responses: unknown = {
  NOT_FOUND:
    "There is no image in the images folder with the name your specified and the there is no 'images' folder.",
  OK: 'Request processing finished successfully.',
  BAD_REQUEST:
    "Make sure to define the needed imageName, width & height properties. And for the width & height to be numbers without 'px'.",
  INTERNAL_SERVER_ERROR:
    'An error happened while processing the image and it was logged, try again later.'
}

type StatusConstantsType = keyof typeof StatusCodes
type StatusConstantsTypeFields = { [key in StatusConstantsType]: number }
interface StatusConstantsTypeExtended extends StatusConstantsTypeFields {}

const getResponseStatus = (constant: StatusConstantsType): ResponseStatus => {
  const statusCode: number = (StatusCodes as StatusConstantsTypeExtended)[constant]
  const statusMessage: string = (responses as keyof typeof responses)[constant]

  return { code: statusCode, message: statusMessage }
}

export default getResponseStatus
