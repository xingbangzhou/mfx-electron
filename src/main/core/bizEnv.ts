import {EventService, invokable5} from '@mfx-js/core'

class BizEnv extends EventService {
  constructor() {
    super('BizEnv')

    this.invokable('getEnvInfo', this.getEnvInfo)
  }

  @invokable5
  getEnvInfo() {
    return {
      version: '1.0.0',
      mode: 'dev',
    }
  }
}

const bizEnv = new BizEnv()

export default bizEnv
