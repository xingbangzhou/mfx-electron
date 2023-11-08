import React, {memo} from 'react'
import './index.scss'
import SettingsSvg from '@main/assets/img/svg/setting.svg'

const LeftBar = memo(function LeftBar() {
  return (
    <div className="leftBar">
      <div className="settings">
        <SettingsSvg />
      </div>
    </div>
  )
})

export default LeftBar
