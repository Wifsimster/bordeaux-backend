const Logger = require('utils/logger')

test('[Logger] info()', () => {
  expect(Logger.info).toThrow()
  expect(Logger.info('test', 'test')).toBeTruthy()
})

test('[Logger] warn()', () => {
  expect(Logger.warn).toThrow()
  expect(Logger.warn('test', 'test')).toBeTruthy()
})

test('[Logger] error()', () => {
  expect(Logger.error).toThrow()
  expect(Logger.error('test', 'test')).toBeTruthy()
})
