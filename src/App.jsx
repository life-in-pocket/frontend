import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './assets/css/main/App.css'
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Sidebar from './components/Sidebar'
import Modal from './components/Modal'
import { getToken } from './api/tokenStorage'

function ProtectedRoute({ children }) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children;
}

function MainApp() {
  return (
    <div className="app">
      <Sidebar />
      <Modal />
    </div>
  )
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/pocket" replace />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pocket" element={
          <ProtectedRoute>
            <MainApp />
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
