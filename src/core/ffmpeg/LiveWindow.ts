import {BrowserWindow} from 'electron'
import Ffmpeg from './Ffmpeg'
import {Writable} from 'stream'

export default class LiveWindow {
  constructor(wind: BrowserWindow) {
    this._wind = wind
  }

  private _wind: BrowserWindow
  private _ffmpeg?: Ffmpeg.FfmpegCommand

  startLive() {
    if (this._ffmpeg) {
      this._ffmpeg.kill('SIGKILL')
      this._ffmpeg = undefined
    }
    const ffmpeg = (this._ffmpeg = Ffmpeg())
    ffmpeg.input('pipe:')
    ffmpeg.inputFPS(15)
    ffmpeg.videoCodec('libx264')
    ffmpeg.format('image2pipe')
    ffmpeg.outputFormat('flv')
    ffmpeg.outputOption(['-f flv', '-pix_fmt yuv420p', '-b:v 500k', '-preset ultrafast'])
    ffmpeg.output('rtmp://172.29.74.164:1935/livehime')

    ffmpeg.on('error', err => {
      console.log(`An error occurred: ${err.message}`)
    })

    ffmpeg.on('end', () => {
      console.log('Processing finished !')
    })

    ffmpeg.run()

    class WindowToRTMPStream extends Writable {
      _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error) => void): void {
        ffmpeg.writeToStream(chunk)
        callback()
      }
    }

    const stream = new WindowToRTMPStream()

    const sendFrame = async () => {
      const image = await this._wind.webContents
        .capturePage(undefined, {
          stayHidden: true,
          stayAwake: true,
        })
        .catch(err => {
          console.error(err)
        })
      if (!image) return

      const buffer = image.toPNG()

      stream.write(buffer)

      await new Promise(resolve => setTimeout(resolve, 1000 / 30))
      sendFrame()
    }

    sendFrame()
  }

  stopLive() {}

  exit() {}
}

// Temp child_process push stream
// startLive() {
//   const cmd = Ffmpeg()
//     .input('pipe:0')
//     .inputFPS(fps)
//     .videoCodec('libx264')
//     .size(`${width}x${height}`)
//     .format('image2pipe')
//     .output('rtmp://172.29.74.164:1935/livehime')
//     .outputOptions(['-f flv', '-b:v 500k', '-preset ultrafast'])

//   cmd.on('error', err => {
//     console.log(`An error occurred: ${err.message}`)
//   })

//   cmd.on('end', () => {
//     console.log('Processing finished !')
//   })

//   cmd.on('start', async commandLine => {
//     console.log(`Spawned Ffmpeg with command: ${commandLine}`)

//     const args = commandLine.split(' ').slice(1)
//     const process = spawn(FfmpegPath, args, {
//       stdio: ['pipe', 'pipe', 'pipe'],
//       detached: true,
//     })

//     process.on('exit', (code, signal) => {
//       console.log(`child process exited with code ${code} and signal ${signal}`)
//       if (process.stdin) {
//         process.stdin.end()
//       }
//       if (process.stdout) {
//         process.stdout.destroy()
//       }
//       if (process.stderr) {
//         process.stderr.destroy()
//       }
//       if (!process.killed) {
//         process.kill()
//       }
//     })

//     process.stderr.on('data', data => {
//       console.log(`stderr: ${data}`)
//     })

//     const sendFrame = async () => {
//       const windowImage = await this._wind.webContents
//         .capturePage(undefined, {
//           stayHidden: true,
//           stayAwake: true,
//         })
//         .catch(err => {
//           console.error(err)
//         })
//       if (!windowImage) return

//       const buffer = windowImage.toPNG()

//       const stream = Readable.from(buffer)

//       // generateFrame()

//       // const stream = canvas.createPNGStream()

//       stream.pipe(process.stdin, {end: false})

//       await new Promise(resolve => setTimeout(resolve, 1000 / (fps / 2)))
//       sendFrame()
//     }

//     sendFrame()
//   })

//   cmd.run()
// }
