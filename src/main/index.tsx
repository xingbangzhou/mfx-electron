import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/base.scss'
import App from './App/index'

const root = document.querySelector('#electron-root')

ReactDOM.createRoot(root).render(<App />)
