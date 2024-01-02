import React, {memo, useEffect} from 'react'
import './index.scss'

const MainView = memo(function MainView() {
  useEffect(() => {
    window.electronPopup.onWindowMessage((event, data, windowId) => {
      console.log('Popup', 'onWindowMessage: ', event, data, windowId)
    })
  }, [])

  return (
    <div className="mainView">
      <button
        onClick={() => {
          window.electronPopup.sendMessageToWindow("hello i'm popup!")
        }}
      >
        发送消息
      </button>
      <button
        onClick={() => {
          window.electronPopup.openDevTool()
        }}
      >
        打开调试器
      </button>
      <button
        onClick={() => {
          window.electronPopup.closeDevTool()
        }}
      >
        关闭调试器
      </button>
    </div>
  )
})

export default MainView
