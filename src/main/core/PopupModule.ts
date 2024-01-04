import {decodeBase64UTF8} from '@mfx-js/core'
import {MxExModule, MxModuleContext} from '@mfx-js/framework'
import {MxDestructor} from '@mfx-js/framework/types'
import bizCore from './bizCore'

class PopupChannel {
  constructor() {}

  private _inited = false
  private _popupModules?: PopupModule[]

  private static s_instance?: PopupChannel

  static instance() {
    if (!PopupChannel.s_instance) {
      PopupChannel.s_instance = new PopupChannel()
    }

    return PopupChannel.s_instance
  }

  attach(popupModule: PopupModule) {
    this.init0()

    if (!this._popupModules) this._popupModules = []
    else if (this._popupModules.includes(popupModule)) return
    this._popupModules.push(popupModule)
  }

  detach(popupModule: PopupModule) {
    this._popupModules = this._popupModules?.filter(el => el !== popupModule)
  }

  private init0() {
    if (this._inited) return
    this._inited = true

    window.electronMain.onWindowMessage(this.onWindowMessage)
    window.electronMain.onWindowClosed(this.onWindowClosed)
  }

  private onWindowMessage = (_event: any, data: any, windowId?: number) => {
    const popupModule = this._popupModules?.find(el => el.windowId === windowId)
    if (!popupModule) return

    try {
      let msgInfo = data
      if (typeof data === 'string') {
        const {content} = decodeBase64UTF8(data)
        msgInfo = JSON.parse(content)
      }
      const {cmd, args} = msgInfo
      if (Array.isArray(args)) {
        popupModule.onCommand(cmd, ...args)
      }
    } catch (err) {
      popupModule.ctx.logger.error('PopupModule', 'onWindowMessage, error: ', err)
    }
  }

  private onWindowClosed = (_event: any, windowId: number) => {
    if (!this._popupModules) return
    const idx = this._popupModules.findIndex(el => el.windowId === windowId)
    if (idx === -1) return

    const popupModule = this._popupModules[idx]
    this._popupModules.splice(idx, 1)

    popupModule.ctx.logger.error('YoExModule', 'onWindowClosed: ', windowId)
    bizCore.framework.unloadModule(popupModule.id)
  }
}

export default class PopupModule extends MxExModule {
  constructor(ctx: MxModuleContext, destructor: MxDestructor, windowId: number) {
    super(ctx, destructor)
    this._windowId = windowId

    PopupChannel.instance().attach(this)

    this.imReady()
  }

  private _windowId: number

  get windowId() {
    return this._windowId
  }

  close() {
    window.electronMain.closeBrowserWindow(this.windowId)
  }

  protected postMessage(cmd: string, ...args: any[]): void {
    window.electronMain.sendMessageToWindow({cmd, args}, this.windowId)
  }
}
