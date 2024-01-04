import MxSDK from '@mfx-js/sdk/MxSDK'
import PopupContext from './PopupContext'

const sdk_ = new MxSDK()

// 实例化SDK通道
if (window.electronPopup) {
  sdk_.activeEx(PopupContext)
}

export default sdk_
