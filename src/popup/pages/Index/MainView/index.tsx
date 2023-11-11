import React, {memo, useEffect} from 'react'
import './index.scss'

const MainView = memo(function MainView() {
  useEffect(() => {
    window.popupElectronApi.onWinMessage((event, data, windowId) => {
      console.log('Popup', 'onWinMessage: ', event, data, windowId)
    })
  }, [])

  return (
    <div className="mainView">
      <button
        onClick={() => {
          window.popupElectronApi.sendMessageToWin("hello i'm popup!")
        }}
      >
        发送消息
      </button>
      <button
        onClick={() => {
          window.popupElectronApi.openDevTools()
        }}
      >
        打开调试器
      </button>
      <button
        onClick={() => {
          window.popupElectronApi.closeDevTools()
        }}
      >
        关闭调试器
      </button>
    </div>
  )
})

export default MainView
