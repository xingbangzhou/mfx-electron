import { BrowserWindow } from "electron";
import Ffmpeg from "fluent-ffmpeg";
import { Readable } from "stream";
import fs from 'fs';

console.log("FfmpegInstaller: ", require("@ffmpeg-installer/ffmpeg"))

Ffmpeg.setFfmpegPath(
  require("@ffmpeg-installer/ffmpeg").path.replace("app.asar", "app.asar.unpacked"),
);

export default class CaptureTask {
  constructor(wind: BrowserWindow) {
    this._wind = wind;
  }

  private _wind: BrowserWindow;
  private _intervalId?: NodeJS.Timeout;
  private _buffers: Buffer[] = [];

  start() {
    this._intervalId = setInterval(this.onTask, 1000 / 30);
    setInterval(() => {
        const render = Readable.from(this._buffers)
      Ffmpeg()
        .addInput(render) // "-pix_fmt yuv420p", 
        .outputOptions(["-f image2pipe", "-pix_fmt yuv420p", "-crf 0", "-preset fast"])
        .videoCodec("libx264")
        // .size(`960x640`)
        .keepPixelAspect()
        .format("mp4")
        .fps(30)
        .on("progress", function (progress) {
          console.log("Processing: " + progress.percent + "% done");
        })
        .on("end", function () {
          console.log("Processing finished !");
        })
        .on("stderr", function (stderrLine) {
          console.log("Stderr output: " + stderrLine);
        })
        .on("error", function (err, stdout, stderr) {
          console.log("Cannot process video: " + err.message);
        })
        .save(`./.ffmpeg_cache/test${Date.now()}.mp4`);

        const buffer0 = this._buffers[0]
        this._buffers = []
        if (buffer0) {
          fs.writeFile(`./.ffmpeg_cache/test${Date.now()}.png`, buffer0, err => {
            console.log("save to file: ", err)
          })
        }

    }, 10 * 1000);
  }

  stop() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
    }
  }

  private onTask = () => {
    this._wind.webContents
      .capturePage(undefined, {
        stayHidden: true,
        stayAwake: true,
      })
      .then((image) => {
        if (!image.isEmpty()) {
          const buffer = image.toPNG();
          this._buffers.push(buffer);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
}
