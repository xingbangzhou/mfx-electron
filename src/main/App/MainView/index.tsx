import React, {memo, useState} from 'react'
import './index.scss'
import {useInterval} from 'ahooks'
import {openWindow} from '@main/core/open'

const MainView = memo(function MainView() {
  const [timeNum, setTimeNum] = useState(0)

  useInterval(() => {
    setTimeNum(timeNum + 1)
  }, 1000 / 30)

  return (
    <div className="mainView">
      <button
        onClick={() => {
          window.electronMain.openDevTool()
        }}
      >
        打开调试器
      </button>
      <button
        onClick={() => {
          window.electronMain.closeDevTool()
        }}
      >
        关闭调试器
      </button>
      <button
        onClick={() => {
          openWindow({url: 'settings', width: 400, height: 600})
        }}
      >
        打开弹窗
      </button>
    </div>
  )
})

export default MainView
