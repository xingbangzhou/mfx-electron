import React, {memo} from 'react'
import './index.scss'

const TitleBar = memo(function TitleBar() {
  return (
    <div className="titleBarContainer">
      <div className="titleBar">
        <p className="title">偏好设置</p>
      </div>
    </div>
  )
})

export default TitleBar
