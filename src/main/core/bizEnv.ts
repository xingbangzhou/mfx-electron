import {EventService, invokable} from '@mfx-js/core'

function invokable5<T extends EventService>(originalMethod: any, context: any) {
  const methodName = context.name
  if (context.private) {
    throw new Error(`'invokable5' cannot decorate private properties like ${methodName as string}.`)
  }
  context.addInitializer(function () {
    console.log('invokable5', originalMethod, context, this)
    ;(this as any)[`i5_${methodName}`] = originalMethod
  })
}

class BizEnv extends EventService {
  constructor() {
    super('BizEnv')
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
