import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/base.scss'
import App from './pages/App'
import bizCore from './core/bizCore'

bizCore.init()

const root = document.querySelector('#root')

ReactDOM.createRoot(root).render(<App />)
