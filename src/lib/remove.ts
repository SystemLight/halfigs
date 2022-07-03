import * as fs from 'fs'
import * as ph from 'path'

import type {IOptionMessage} from '@/interface/iOption'
import {readFolder, stat} from './info'

/*
    删除一个空文件夹
*/
export function removeEmptyFolder(dirPath: string): Promise<IOptionMessage> {
  return new Promise((resolve) => {
    fs.rmdir(dirPath, (err) => {
      err && resolve({err, success: false})
      resolve({success: true})
    })
  })
}

/*
    删除一个空文件
 */
export function removeFile(filePath: string): Promise<IOptionMessage> {
  return new Promise((resolve) => {
    fs.unlink(filePath, (err) => {
      err && resolve({err, success: false})
      resolve({success: true})
    })
  })
}

/*
    删除文件夹，等同 `rm -rf`
 */
export async function removeFolder(dirPath: string): Promise<IOptionMessage> {
  const {err, info: files} = await readFolder(dirPath)
  if (err) {
    return {err, success: false}
  }
  for (const f in files) {
    const nowPath = ph.join(dirPath, files[f])
    const {info: stats} = await stat(nowPath)
    if (stats) {
      if (stats.isFile()) {
        const {err} = await removeFile(nowPath)
        if (err) {
          return {err, success: false}
        }
      }
      if (stats.isDirectory()) {
        const {err} = await removeFolder(nowPath)
        if (err) {
          return {err, success: false}
        }
      }
    }
  }
  return await removeEmptyFolder(dirPath)
}

/*
    删除文件或文件夹，等同 `rm -rf`
 */
export async function rm(path: string): Promise<IOptionMessage> {
  path = ph.resolve(path)
  const {err, info: stats} = await stat(path)
  if (err) {
    return {err, success: false}
  }
  if (stats.isDirectory()) {
    return await removeFolder(path)
  } else {
    return await removeFile(path)
  }
}
