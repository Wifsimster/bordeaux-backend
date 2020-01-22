const Activity = require('classes/activity')

class ChannelActivity {
  constructor() {}

  static async response(data) {
    switch (data.method) {
    case 'getAll':
      return Activity.getAll(data.params)
    case 'add':
      return Activity.add(data.params)
    default:
      throw new Error(`[Activity] Unknow method : ${data.method}`)
    }
  }
}

module.exports = ChannelActivity
