const Activity = require('classes/activity')
const File = require('utils/file')

test('[Activity] add()', async () => {
  await expect(Activity.add()).rejects.toThrow()
  await expect(Activity.add({})).rejects.toThrow()
  await expect(Activity.add({ type: ''})).rejects.toThrow()
  await expect(Activity.add({ type: 'test_01', object: 'test_01', message: 'test_01'})).resolves.toBeTruthy()
  await expect(Activity.add({ type: 'test_02', object: 'test_02', message: 'test_02'})).resolves.toBeTruthy()
})

test('[Activity] getAll()', async () => {
  await expect(Activity.getAll({ })).rejects.toThrow()
  await expect(Activity.getAll({ date: new Date() })).rejects.toThrow()
  await expect(Activity.getAll({ date: '22/01/2012' })).rejects.toThrow()
  await expect(Activity.getAll({ date: new Date().toISOString().slice(0, 10) })).resolves.toBeTruthy()
  File.removeFile(`activity-${new Date().toISOString().slice(0, 10)}`)
})
