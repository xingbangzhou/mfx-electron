import React, {memo} from 'react'
import './index.scss'

const MainView = memo(function MainView() {
  return (
    <div className="mainView">
      <button
        onClick={() => {
          window.mainElectronApi.openDevTools()
        }}
      >
        打开调试器
      </button>
      <button
        onClick={() => {
          window.mainElectronApi.closeDevTools()
        }}
      >
        关闭调试器
      </button>
    </div>
  )
})

export default MainView
