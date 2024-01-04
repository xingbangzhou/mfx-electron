import React, {memo, useEffect, useState} from 'react'
import './index.scss'
import getEnvInfo from '@settings/core/getEnvInfo'

interface ItemTitleProps {
  title: string
}

const ItemTitle = memo(function ItemTitle(props: ItemTitleProps) {
  const {title} = props

  return (
    <div className="itemTitle">
      <p className="name">{title}</p>
      <div className="line" />
    </div>
  )
})

const MainView = memo(function MainView() {
  const [envInfo, setEnvInfo] = useState({version: '', mode: ''})

  useEffect(() => {
    getEnvInfo().then(info => setEnvInfo(info))
  }, [])

  return (
    <div className="mainView">
      <ItemTitle title="环境变量" />
      <p>{`版本号：${envInfo.version}  模式：${envInfo.mode}`}</p>
    </div>
  )
})

export default MainView
