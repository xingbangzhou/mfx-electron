import React, {memo} from 'react'
import './index.scss'
import Setting from './Setting'
import UserAvatar from './UserAvatar'

const TitleBar = memo(function TitleBar() {
  return (
    <div className="titleBarContainer">
      <div className="titleBar">
        <UserAvatar />
        <div className="holder" />
        <div className="tools">
          <Setting />
        </div>
      </div>
    </div>
  )
})

export default TitleBar
