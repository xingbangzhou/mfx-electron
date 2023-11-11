import React, {memo, useEffect} from 'react'
import './index.scss'
import SettingsSvg from '@main/assets/img/svg/setting.svg'

const LeftBar = memo(function LeftBar() {
  useEffect(() => {
    window.mainElectronApi.onWinMessage((event, data, windowId) => {
      console.log('Main', 'onWinMessage: ', event, data, windowId)
    })
  }, [])

  return (
    <div className="leftBar">
      <div
        className="settings"
        onClick={() => {
          window.mainElectronApi.openSettings()
        }}
      >
        <SettingsSvg />
      </div>
    </div>
  )
})

export default LeftBar
