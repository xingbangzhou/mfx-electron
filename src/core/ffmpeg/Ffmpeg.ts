import Ffmpeg from 'fluent-ffmpeg'

const FfmpegPath = require('@ffmpeg-installer/ffmpeg').path.replace('app.asar', 'app.asar.unpacked')
Ffmpeg.setFfmpegPath(FfmpegPath)

export default Ffmpeg
