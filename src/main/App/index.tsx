import React, {memo} from 'react'
import './index.scss'
import TitleBar from './TitleBar'
import LeftBar from './LeftBar'
import MainView from '@main/App/MainView'

const App = memo(function App() {
  return (
    <div className="app">
      <TitleBar />
      <LeftBar />
      <MainView />
    </div>
  )
})

export default App
