import WebSocket from 'ws'

import Logger from 'utils/logger'
import File from 'utils/file'

import { Activity, Directory, Download, Explorer, Fanart, Git, Plex, Server, Subtitles, Trakt, Transfert, Transmission } from 'channels'
import { CronTransfert, CronUpdate } from 'cron'

const PORT = 8080

async function main() {
  let settings = { host: 'localhost', port: PORT }
  let update = { cron: '* * */1 * *', enable: true }

  // Initialize settings files at startup
  try {
    await File.readFile('directory-config')
  } catch(err) {
    await File.writeFile('directory-config', {})
  }

  try {
    await File.readFile('plex-config')
  } catch(err) {
    await File.writeFile('plex-config', {})
  }

  try {
    settings = await File.readFile('server-config')
  } catch(err) {
    await File.writeFile('server-config', settings)
  }

  try {
    await File.readFile('subtitles-config')
  } catch(err) {
    await File.writeFile('subtitles-config', {})
  }

  try {
    await File.readFile('trakt-config')
  } catch(err) {
    await File.writeFile('trakt-config', {})
  }

  try {
    await File.readFile('transmission-config')
  } catch(err) {
    await File.writeFile('transmission-config', {})
  }

  try {
    update = await File.readFile('update-config')
  } catch(err) {
    await File.writeFile('update-config', update)
  }

  const wss = new WebSocket.Server({ port: PORT })

  console.log(`[Backend] Server started : ws://${settings.host}:${settings.port}`)

  Logger.info(
    'Server',
    `Server started : ws://${settings.host}:${settings.port}`
  )

  // Trigger CRON jobs
  // CronUpdate()
  // CronTransfert()

  wss.on('connection', function connection(ws) {
    // Detect and close broken connections
    ws.isAlive = true

    ws.on('pong', () => {
      ws.isAlive = true
    })

    ws.on('message', async data => {
      data = JSON.parse(data)

      console.debug(`==== ${data.object}.${data.method}() ====`)

      switch (data.object) {
      case 'activity':
        data = await Activity.response(data)
        break
      case 'directory':
        data = await Directory.response(data)
        break
      case 'download':
        data = await Download.response(data)
        break
      case 'explorer':
        data = await Explorer.response(data)
        break
      case 'fanart':
        data = await Fanart.response(data)
        break
      case 'git':
        data = await Git.response(data)
        break
      case 'plex':
        data = await Plex.response(data)
        break
      case 'server':
        data = await Server.response(data)
        break
      case 'subtitles':
        data = await Subtitles.response(data)
        break
      case 'trakt':
        data = await Trakt.response(data)
        break
      case 'transfert':
        data = await Transfert.response(data)
        break
      case 'transmission':
        data = await Transmission.response(data)
        break
      default:
        Logger.warn('Server', `Unknow object : '${data.object}'`)
        console.error(`Unknow object : '${data.object}'`)
      }

      // Broadcast response to all connected clients
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data))
        }
      })
    })
  })
}

main()
