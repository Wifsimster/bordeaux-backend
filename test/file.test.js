const File = require('../src/utils/file')

test('[file] existFile()', () => {
  expect(File.existFile('server')).toBeFalsy()
  expect(File.existFile('server-config')).toBeTruthy()
})

test('[file] getRoot()', () => {
  expect(File.getRoot()).toBeDefined()
  expect(typeof File.getRoot()).toEqual('string')
})

test('[file] getDirectories()', () => {
  expect(File.getDirectories()).toBeFalsy()
  expect(typeof File.getDirectories(File.getRoot())).toEqual('object')
})

test('[file] writeFile()', async () => {
  await expect(File.writeFile('test')).rejects.toThrow()
  await expect(File.writeFile('test', 'test')).rejects.toThrow()
  await expect(File.writeFile('test', { test: 'test' })).resolves.toBeTruthy()
})

test('[file] readFile()', async () => {
  await expect(File.readFile('server')).rejects.toThrow()
  await expect(File.readFile('test')).resolves.toBeTruthy()
})

test('[file] removeFile()', async () => {
  await expect(File.removeFile('azerty')).rejects.toThrow()
  await expect(File.removeFile('test')).resolves.toBeTruthy()
})
