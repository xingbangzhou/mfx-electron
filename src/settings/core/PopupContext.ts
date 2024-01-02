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

  private onWindowMessage = (_event: any, data: unknown, _windowId?: number) => {
    try {
      const msgInfo = typeof data === 'string' ? JSON.parse(decodeBase64UTF8(data)) : data
      const {cmd, args} = msgInfo
      if (Array.isArray(args)) {
        this.onCommand(cmd, ...args)
      }
    } catch (err) {
      console.error('PopupContext', 'onWindowMessage, error: ', err)
    }
  }
}
