import { StatusCodes } from 'http-status-codes'

import { ResponseStatus } from './types/response.interface'

export const errors: unknown = {
  NOT_FOUND: 'There is no image in the images folder with the name your specified.',
  OK: 'Request processing finished successfully.',
  BAD_REQUEST: 'Make sure to define the needed width & height and for them to be numbers.',
  INTERNAL_SERVER_ERROR:
    'An error happened while processing the image and it was logged, try again later.'
}

type StatusConstantsType = keyof typeof StatusCodes
type StatusConstantsTypeFields = { [key in StatusConstantsType]: number }
interface StatusConstantsTypeExtended extends StatusConstantsTypeFields {}

export const getResponseStatus = (constant: StatusConstantsType): ResponseStatus => {
  const statusCode: number = (StatusCodes as StatusConstantsTypeExtended)[constant]
  const statusMessage: string = (errors as keyof typeof errors)[constant]

  return { code: statusCode, message: statusMessage }
}
