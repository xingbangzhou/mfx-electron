import React, {memo} from 'react'
import TitleBar from './TitleBar'
import './index.scss'
import MainView from './MainView'

const Index = memo(function Index() {
  return (
    <div className="app">
      <TitleBar />
      <MainView />
    </div>
  )
})

export default Index
