import path from 'path'

import { isThisFileExist } from './handle-fs'
import getResponseStatus from './handle-response'

import ResponseStatus from './types/response.interface'

const validateQueryParams = async (
  imageName: string,
  width: string,
  height: string,
  imagesDirectories: { resized: string[]; main: string[] }
): Promise<{ isQueriesValid: boolean; responseStatus?: ResponseStatus; extraValues?: object }> => {
  if (!imageName) {
    // if image name aren't defined, tell the user
    const responseStatus: ResponseStatus = getResponseStatus('BAD_REQUEST')

    return {
      isQueriesValid: false,
      responseStatus,
      extraValues: { 'received-imageName': imageName }
    }
  }

  const isImageExist = await isThisFileExist(
    `${imageName}.jpg`,
    path.join(__dirname, ...imagesDirectories.main)
  )
  if (!isImageExist) {
    // if there is no image, tell the user
    const responseStatus: ResponseStatus = getResponseStatus('NOT_FOUND')

    return {
      isQueriesValid: false,
      responseStatus,
      extraValues: { 'received-imageName': imageName }
    }
  }

  if (!width || !height || Number.isNaN(Number(width)) || Number.isNaN(Number(height))) {
    // if width or height aren't defined, tell the user
    const responseStatus: ResponseStatus = getResponseStatus('BAD_REQUEST')

    return {
      isQueriesValid: false,
      responseStatus,
      extraValues: { 'received-width': width, 'received-height': height }
    }
  }

  return {
    isQueriesValid: true
  }
}

export default validateQueryParams
