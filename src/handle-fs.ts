import fileExists from 'file-exists'
import path from 'path'
import fs from 'fs'

export const isThisFileExist = async (file: string, dirPath: string): Promise<boolean> => {
  const isExist = await fileExists(file, { root: dirPath })
  return isExist
}

export const isThisFolderExist = async (dirPath: string): Promise<boolean> => {
  const absoluteDirPath = path.resolve(__dirname, dirPath)
  console.log(absoluteDirPath)

  const isExist = fs.existsSync(absoluteDirPath)
  return isExist
}

export const createFolder = async (dirPath: string): Promise<void> => {
  const absoluteDirPath = path.resolve(__dirname, dirPath)

  fs.mkdir(absoluteDirPath, (e) => {
    if (e) {
      console.error(e)
    } else {
      console.log('Success')
    }
  })
}
