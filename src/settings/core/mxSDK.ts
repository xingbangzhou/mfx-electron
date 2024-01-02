import MxSDK from '@mfx-js/sdk/MxSDK'
import PopupContext from './PopupContext'

const mxSDK = new MxSDK()

// 实例化SDK通道
if (window.electronPopup) {
  mxSDK.activeEx(PopupContext)
}

export default mxSDK
