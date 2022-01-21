import { StatusCodes } from 'http-status-codes'

import { ResponseStatus } from './types/response.interface'

export const errors: unknown = {
  404: 'There is no image in the images folder with the name your specified.',
  200: 'Request processing finished successfully.',
  400: 'Make sure to define the needed width & height.'
}

type StatusConstantsType = keyof typeof StatusCodes
type StatusConstantsTypeFields = { [key in StatusConstantsType]: number }
interface StatusConstantsTypeExtended extends StatusConstantsTypeFields {}

export const getResponseStatus = (constant: StatusConstantsType): ResponseStatus => {
  const statusCode: number = (StatusCodes as StatusConstantsTypeExtended)[constant]
  const statusMessage: string = (errors as keyof typeof errors)[statusCode]

  return { code: statusCode, message: statusMessage }
}
