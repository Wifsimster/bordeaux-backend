const TMDB = require('../classes/tmdb')

const episode = {
  show: {
    ids: {
      tmdb: ''
    }
  },
  episode: {
    season: '01',
    number: '01'
  }
}

test('test getApiKey()', () => {
  expect(TMDB.getApiKey()).toBe('45f0dbbbdee6820d59727e39febc79e3')
})

test('test getEpisodeImages()', async () => {
  const tmdb = new TMDB()

  const data = await tmdb.getEpisodeImages(episode)

  // TODO
  // expect(data).toBeDefined()
})


