import { execSync } from 'child_process'

import File from 'utils/file'
import Logger from 'utils/logger'

const CONFIG_FILE = 'update-config'

class Git {
  constructor() {}

  static async response(data) {
    switch (data.method) {
    case 'getAll':
      data.results = await File.readFile(CONFIG_FILE)
      break
    case 'update':
      if (data.params) {
        await File.writeFile(CONFIG_FILE, data.params)
        data.results = await File.readFile(CONFIG_FILE)
      }
      break
    case 'pull':
      Logger.info('Git', 'Searching for update')
      data.results = execSync('git pull origin master').toString()
      Logger.info('Git', data.results)
      break
    default:
      Logger.info('Git', `Unknow method : ${data.method}`)
      console.log(`[Git] Unknow method : ${data.method}`)
    }
    return data
  }
}

export default Git
