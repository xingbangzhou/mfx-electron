import React, {memo, useState} from 'react'
import './index.scss'
import mxSDK from '@settings/core/mxSDK'

const getEnvInfo = async () => {
  const ctx = await mxSDK.ensure()
  console.log('ffffffff')
  const result = await ctx.invoke('BizEnv', 'getEnvInfo')
  console.log('ffffffff1')
  return result
}

const MainView = memo(function MainView() {
  const [envInfo, setEnvInfo] = useState({})

  return (
    <div className="mainView">
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
      <button
        onClick={() => {
          getEnvInfo().then(info => setEnvInfo(info))
        }}
      >
        获取环境信息
      </button>
      <p>{`${JSON.stringify(envInfo)}`}</p>
      <button
        onClick={() => {
          window.electronPopup?.close()
        }}
      ></button>
    </div>
  )
})

export default MainView
