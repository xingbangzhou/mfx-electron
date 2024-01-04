import {decodeBase64UTF8} from '@mfx-js/core'
import {MxExContext} from '@mfx-js/sdk'

export default class PopupContext extends MxExContext {
  constructor() {
    super()

    window.electronPopup.onWindowMessage(this.onWindowMessage)

    this.imReady()
  }

  protected postMessage(cmd: string, ...args: any[]): void {
    window.electronPopup.sendMessageToWindow({cmd, args})
  }

  private onWindowMessage = (_event: any, data: any, _windowId?: number) => {
    try {
      let msgInfo = data
      if (typeof data === 'string') {
        const {content} = decodeBase64UTF8(data)
        msgInfo = JSON.parse(content)
      }
      const {cmd, args} = msgInfo
      if (Array.isArray(args)) {
        this.onCommand(cmd, ...args)
      }
    } catch (err) {
      console.error('PopupContext', 'onWindowMessage, error: ', err)
    }
  }
}
