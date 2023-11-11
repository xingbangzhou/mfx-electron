import React, {memo, useEffect} from 'react'
import './index.scss'
import { onWinMessage } from '@core/browserWins/preload'

const MainView = memo(function MainView() {

  useEffect(() => {
    onWinMessage()
  }, [])

  return (
    <div className="mainView">
      <button>发送消息</button>
    </div>
  )
})

export default MainView
