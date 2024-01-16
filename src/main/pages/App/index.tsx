import React, {memo} from 'react'
import './index.scss'
import TitleBar from './TitleBar'
import LeftBar from './LeftBar'
import MainView from './MainView'
import {Provider} from 'react-redux'
import store from '@main/store'

const App = memo(function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <TitleBar />
        <LeftBar />
        <MainView />
      </div>
    </Provider>
  )
})

export default App
