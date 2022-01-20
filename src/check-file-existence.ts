import fileExists from 'file-exists'

export let isThisFileExist = async (file: string, dirPath: string): Promise<boolean> => {
  const isExist = await fileExists(file, { root: dirPath })
  return isExist
}
