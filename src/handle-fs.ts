import fileExists from 'file-exists'
import path from 'path'
import fs from 'fs'

export const isThisFileExist = async (file: string, dirPath: string): Promise<boolean> => {
  const isExist = await fileExists(file, { root: dirPath })
  return isExist
}

const isThisFolderExist = async (absoluteDirPath: string): Promise<boolean> => {
  const isExist = fs.existsSync(absoluteDirPath)
  return isExist
}

export const createFolderIfNotExist = async (...dirPath: string[]): Promise<void> => {
  const absoluteDirPath = path.resolve(__dirname, ...dirPath)
  // console.log(absoluteDirPath)

  if (await isThisFolderExist(absoluteDirPath)) return

  fs.mkdir(absoluteDirPath, (e) => {
    if (e) {
      console.error(e)
    } else {
      console.log('Thumbnails folder creation succeeded.')
    }
  })
}

// createFolderIfNotExist('..', 'medo')
