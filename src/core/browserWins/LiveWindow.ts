import {BrowserWindow} from 'electron'
import Ffmpeg from 'fluent-ffmpeg'
import {spawn} from 'child_process'
import {Readable} from 'stream'

const FfmpegPath = require('@ffmpeg-installer/ffmpeg').path.replace('app.asar', 'app.asar.unpacked')
Ffmpeg.setFfmpegPath(FfmpegPath)

const fps = 15
const width = 960
const height = 640

export default class LiveWindow {
  constructor(wind: BrowserWindow) {
    this._wind = wind
  }

  private _wind: BrowserWindow

  startLive() {
    const cmd = Ffmpeg()
      .input('pipe:0')
      .inputFPS(fps)
      .videoCodec('libx264')
      .size(`${width}x${height}`)
      .format('image2pipe')
      .output('rtmp://192.168.0.102:1935/livehime')
      .outputOptions(['-f flv', '-b:v 500k', '-preset ultrafast'])

    cmd.on('error', err => {
      console.log(`An error occurred: ${err.message}`)
    })

    cmd.on('end', () => {
      console.log('Processing finished !')
    })

    cmd.on('start', async commandLine => {
      console.log(`Spawned Ffmpeg with command: ${commandLine}`)

      const args = commandLine.split(' ').slice(1)
      const process = spawn(FfmpegPath, args, {
        stdio: ['pipe', 'pipe', 'pipe'],
        detached: true,
      })

      process.on('exit', (code, signal) => {
        console.log(`child process exited with code ${code} and signal ${signal}`)
        if (process.stdin) {
          process.stdin.end()
        }
        if (process.stdout) {
          process.stdout.destroy()
        }
        if (process.stderr) {
          process.stderr.destroy()
        }
        if (!process.killed) {
          process.kill()
        }
      })

      process.stderr.on('data', data => {
        console.log(`stderr: ${data}`)
      })

      const sendFrame = async () => {
        const windowImage = await this._wind.webContents
          .capturePage(undefined, {
            stayHidden: true,
            stayAwake: true,
          })
          .catch(err => {
            console.error(err)
          })
        if (!windowImage) return

        const buffer = windowImage.toPNG()

        const stream = Readable.from(buffer)

        // generateFrame()

        // const stream = canvas.createPNGStream()

        stream.pipe(process.stdin, {end: false})

        await new Promise(resolve => setTimeout(resolve, 1000 / (fps / 2)))
        sendFrame()
      }

      sendFrame()
    })

    cmd.run()
  }

  stopLive() {}

  exit() {}
}
