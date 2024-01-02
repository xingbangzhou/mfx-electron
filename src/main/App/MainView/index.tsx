import React, {memo, useState} from 'react'
import './index.scss'
import {useInterval} from 'ahooks'

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
      <div className="timing">{timeNum}</div>
    </div>
  )
})

export default MainView
