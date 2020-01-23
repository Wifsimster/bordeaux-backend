import Activity from 'classes/activity'

class ChannelActivity {
  constructor() {}

  static async response(data) {
    switch (data.method) {
    case 'getAll':
      data.results = await Activity.getAll(data.params).catch(err => {
        data.error = err.message
      })
      break
    case 'add':
      data.results = await Activity.add(data.params).catch(err => {
        data.error = err.message
      })
      break
    default:
      console.log(`[Activity] Unknow method : ${data.method}`)
    }
    return data
  }
}

export default ChannelActivity
