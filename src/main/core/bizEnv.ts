import {EventService} from '@mfx-js/core'

const storedInvokableSymbol = Symbol('mxservice-invokable')

function invokable_t5(originalMethod: any, context: ClassMemberDecoratorContext) {
  const methodName = context.name
  if (context.private) {
    throw new Error(`'invokable5' cannot decorate private properties like ${methodName as string}.`)
  }

  context.addInitializer(function (this: any) {
    if (!this[storedInvokableSymbol]) {
      this[storedInvokableSymbol] = {}
    }

    this[storedInvokableSymbol][methodName] = originalMethod
  })
}

class BizEnv extends EventService {
  constructor() {
    super('BizEnv')

    this.invokable('getEnvInfo', this.getEnvInfo)
  }

  @invokable_t5
  getEnvInfo() {
    return {
      version: '1.0.0',
      mode: 'dev',
    }
  }
}

const bizEnv = new BizEnv()

console.log('ffffffff', bizEnv)

export default bizEnv
