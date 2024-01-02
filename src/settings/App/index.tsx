import React, {memo} from 'react'
import TitleBar from './TitleBar'
import './index.scss'
import MainView from './MainView'

const App = memo(function App() {
  return (
    <div className="app">
      <TitleBar />
      <MainView />
    </div>
  )
})

export default App
