const Activity = require('channels/activity')

class Logger {
  constructor() {}

  static info(object, message) {
    if(object !== undefined && object !== null && message !== undefined && message !== null) {
      Activity.response({
        method: 'add',
        params: {
          type: 'info',
          object: object,
          message: message
        }
      })
      return true
    } else {
      throw new Error('params are missing !')
    }
  }

  static warn(object, message) {
    if(object !== undefined && object !== null && message !== undefined && message !== null) {
      Activity.response({
        method: 'add',
        params: {
          type: 'warn',
          object: object,
          message: message
        }
      })
      return true
    } else {
      throw new Error('params are missing !')
    }
  }

  static error(object, message) {
    if(object !== undefined && object !== null && message !== undefined && message !== null) {
      Activity.response({
        method: 'add',
        params: {
          type: 'error',
          object: object,
          message: message
        }
      })
      return true
    } else {
      throw new Error('params are missing !')
    }
  }
}

module.exports = Logger
