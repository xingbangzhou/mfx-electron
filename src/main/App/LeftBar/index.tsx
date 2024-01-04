import React, {memo, useEffect} from 'react'
import './index.scss'
import SettingSVG from '@main/assets/img/svg/setting.svg'
import {openWindow} from '@main/core/open'

const SettingBtn = memo(function SettingsBtn() {
  return (
    <div
      className="settingBtn"
      onClick={() => {
        openWindow({url: 'settings', width: 400, height: 600, useSystemTitleBar: true})
      }}
    >
      <SettingSVG />
    </div>
  )
})

const LeftBar = memo(function LeftBar() {
  useEffect(() => {}, [])

  return (
    <div className="leftBar">
      <SettingBtn />
    </div>
  )
})

export default LeftBar
