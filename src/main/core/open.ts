import {OpenBrowserWindowProps} from '@main/types/electron'
import logger from './logger'
import PopupModule from './PopupModule'
import bizCore from './bizCore'

/** openWindow */
let popupBlockList: {moduleId: string; openTime: number}[] = []

const checkPopupBlock = () => {
  const curTime = new Date().getTime()
  popupBlockList = popupBlockList.filter(el => curTime - el.openTime < 3000)
}

export async function openWindow(props: OpenBrowserWindowProps) {
  logger.log('openWindow', `props: `, props)

  const {key, url} = props
  if (!url) {
    logger.error('openWindow', 'url is invalid!')
    return false
  }

  const moduleId = key || url
  checkPopupBlock()
  if (popupBlockList.find(el => el.moduleId === moduleId)) {
    logger.log('openWindow', `moduleId: ${moduleId} is blocked!`)
    return false
  }

  const popupModule = bizCore.framework.getModule(moduleId) as PopupModule | undefined
  if (popupModule) {
    const isEnabled = popupModule.enabled
    if (!isEnabled) {
      bizCore.ctx.log('openWindow', `moduleId: ${moduleId} already exists, and enabled: ${popupModule.enabled}`)
      popupModule.close()
    } else {
      return true
    }
  }
  const windowInfo = await window.electronMain.openBrowserWindow(props)
  logger.log('openWindow', `openBrowserWindow, windowInfo:  `, windowInfo)

  const newBlockList: {moduleId: string; openTime: number}[] = []
  for (let i = 0, length = popupBlockList.length; i < length; i++) {
    const item = popupBlockList[i]
    if (item.moduleId === moduleId) continue
    newBlockList.push(item)
  }
  popupBlockList = newBlockList

  if (!windowInfo.windowId) {
    logger.log('openWindow', `openBrowserWindow is failed!`)
    return false
  }

  bizCore.framework.loadExModule(PopupModule, moduleId, windowInfo.windowId) as PopupModule | undefined

  return true
}

export function gotoUrl(url: string, login?: boolean) {
  logger.log('gotoUrl', url, login)

  window.open(url)
}

// 对外开放打开弹窗
bizCore.ctx.addEventListener('OpenWindow', (props: OpenBrowserWindowProps) => {
  openWindow(props)
})

//对外开放打开链接
bizCore.ctx.addEventListener('GotoUrl', (url: string, login?: boolean) => {
  gotoUrl(url, login)
})
