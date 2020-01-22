/* eslint-disable no-undef */
import fs from 'fs'
import path from 'path'

const ENCODING = 'utf-8'

class File {
  constructor() {}

  static existFile(filename) {
    if (!fs.existsSync(path.resolve(`${DIR_NAME}/data/${filename}.json`))) {
      return false
    }
    return true
  }

  static getRoot() {
    const rootPath = path.dirname(
      require.main.filename || process.mainModule.filename
    )
    const disk = rootPath.split('\\')[0]
    return `${disk}/`
  }

  static getDirectories(root) {
    if(root !== null && root !== undefined) {
      try {
        return fs
          .readdirSync(root, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name)
      } catch (err) {
        return false
      }
    }
    return false
  }

  static async readFile(filename) {
    if (!fs.existsSync(`${DIR_NAME}/data/`)) {
      fs.mkdirSync(`${DIR_NAME}/data/`)
    }

    return await fs.promises
      .readFile(path.resolve(`${DIR_NAME}/data/${filename}.json`), {
        encoding: ENCODING
      })
      .then(async data => {
        try {
          return JSON.parse(data)
        } catch(err) {
          throw new Error(`ReadFile : ${err}`)
        }
      })
      .catch(err => {
        throw new Error(`ReadFile : ${err}`)
      })
  }

  static async writeFile(filename, data) {
    if (data !== null && data !== undefined && typeof data === 'object') {
      return await fs.promises
        .writeFile(
          path.resolve(`${DIR_NAME}/data/${filename}.json`),
          JSON.stringify(data),
          {
            encoding: ENCODING,
            flag: 'w'
          }
        ).then(() => {
          return true
        })
        .catch(err => {
          throw new Error(`WriteFile : ${err}`)
        })
    } else {
      throw new Error(`Trying to write '${filename}' with no object data!`)
    }
  }

  static async removeFile(filename) {
    if(filename !== null && filename !== undefined && filename !== '') {
      return await fs.promises
        .unlink(
          path.resolve(`${DIR_NAME}/data/${filename}.json`)
        ).then(() => {
          return true
        })
        .catch(err => {
          throw new Error(`unlink : ${err}`)
        })
    } else {
      throw new Error('Missing filename !')
    }
  }
}

export default File
