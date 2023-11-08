import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/css/base.scss'
import Index from './pages/Index/index'

const root = document.querySelector('#electron-root')

ReactDOM.createRoot(root).render(<Index />)
