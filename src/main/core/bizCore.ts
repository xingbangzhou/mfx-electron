import {MxFrameworkLauncher} from '@mfx-js/framework'
import bizEnv from './bizEnv'

class BizCore extends MxFrameworkLauncher {
  private _intied = false

  init() {
    if (this._intied) return
    this._intied = true

    this.framework.init()

    this.ctx.register(bizEnv)
  }

  get ctx() {
    return this.framework.ctx
  }
}

const bizCore = new BizCore()

export default bizCore
