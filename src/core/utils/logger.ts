export enum LogType {
  Log,
  Warn,
  Error,
}

class Logger {
  log(name: string, ...args: unknown[]) {
    console.log(`%c[Log][${name}]%c[${this.timeStr()}]`, `color: #c678dd`, `color: gray`, ...args)
  }

  warn(name: string, ...args: unknown[]) {
    console.warn(`%c[Warn][${name}]%c[${this.timeStr()}]`, `color: #953800`, `color: gray`, ...args)
  }

  error(name: string, ...args: unknown[]) {
    console.error(`%c[Error][${name}]%c[${this.timeStr()}]`, `color: red`, `color: gray`, ...args)
  }

  private timeStr() {
    const dt = new Date()
    return `${dt.getHours()}:${dt.getMinutes()}:${dt.getSeconds()}.${dt.getMilliseconds()}`
  }
}

const logger = new Logger()

export default logger
