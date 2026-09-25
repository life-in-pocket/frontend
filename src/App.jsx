import { BrowserRouter, Routes, Route } from "react-router-dom";
import './assets/css/main/App.css'
import LoginPage from "./components/LoginPage";
import Sidebar from './components/Sidebar'
import Modal from './components/Modal'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainApp />} />
      </Routes>
    </BrowserRouter>
  )
}

function MainApp() {
  return (
    <div className="app">
      <Sidebar />
      <Modal />
    </div>
  )
}

export default App
