import File from 'utils/file'
import format from 'date-fns/format'

class Activity {
  constructor() {}

  static async getAll(params) {
    if (params && typeof params === 'object' && typeof params.date === 'string') {
      return await File.readFile(`activity-${params.date}`, { flag: 'r' })
    } else {
      throw new Error('params are missings from data !')
    }
  }

  static async add(data) {
    const filename = `activity-${new Date().toISOString().slice(0, 10)}`
    let fileData = []

    try {
      fileData = await File.readFile(filename)
    } catch(err) {
      await File.writeFile(filename, fileData)
    }

    if (fileData !== null && fileData !== undefined && Array.isArray(fileData)) {
      if(data && typeof data === 'object' && data.type && data.object && data.message) {
        fileData.push({
          date: format(new Date(), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx'),
          type: data.type,
          object: data.object,
          message: data.message
        })

        return await File.writeFile(filename, fileData)
      } else {
        throw new Error('[Activity] Data params is not wel formatted !')
      }
    } else {
      throw new Error('[Activity] File data is not well formatted !')
    }
  }
}

export default Activity
