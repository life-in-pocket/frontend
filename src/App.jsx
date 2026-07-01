import { useState } from 'react'
import './assets/css/main/App.css'
import Sidebar from './components/Sidebar'
import Modal from './components/Modal'

function App() {

  return (
    <div className="app">
      <Sidebar />
      <Modal />
    </div>
  )
}
export default App
