
import Pavie from 'pavie'
import CryptoJS from 'crypto-js'

import File from 'utils/file'
import Logger from 'utils/logger'

const CONFIG_FILE = 'plex-config'

class Plex {
  constructor() {}

  static async getSettings(uuid) {
    try {
      const settings = await File.readFile(CONFIG_FILE)

      if (settings) {
        const bytes = CryptoJS.AES.decrypt(settings.password, uuid)
        settings.password = bytes.toString(CryptoJS.enc.Utf8)
      }

      return settings
    } catch (err) {
      Logger.error('Plex', err.message)
      throw new Error(err)
    }
  }

  static async response(data) {
    let pavie, settings, results

    switch (data.method) {
    case 'getAll':
      data.results = await File.readFile(CONFIG_FILE)
      break
    case 'update':
      await File.writeFile(CONFIG_FILE, data.params)
      data.results = await File.readFile(CONFIG_FILE)
      break
    case 'signin':
      try {
        settings = await this.getSettings(data.params.uuid)
        pavie = new Pavie(settings)
        results = await pavie.signin()

        if (results) {
          data.results = await pavie.getUser()

          if (data.results && data.results.authToken) {
            settings.token = data.results.authToken
            await File.writeFile(CONFIG_FILE, settings)
          }
        }
      } catch (err) {
        Logger.error('Plex', err.message)
        data.error = err.message
      }
      break
    case 'refresh':
      try {
        Logger.info('Plex', 'Synchronize tb show library')

        settings = await this.getSettings(data.params.uuid)
        pavie = new Pavie(settings)
        await pavie.signin()
        data.results = await pavie.refresh()
      } catch (err) {
        Logger.error('Plex', err.message)
        data.error = err.message
      }
      break
    default:
      Logger.warn('Plex', `Unknow method : ${data.method}`)
      console.warn(`[Plex] Unknow method : ${data.method}`)
    }
    return data
  }
}

export default Plex
