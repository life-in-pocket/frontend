import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './assets/css/App.css'
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Sidebar from './features/sidebar/Sidebar'
import Modal from './pages/Modal'
import { getToken } from './api/tokenStorage'
import Statistic from "./pages/Statistic";

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

function StatisticPage() {
  return (
    <div className="app">
      <Sidebar />
      <Statistic />
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
        <Route path="/statistics" element={
          <ProtectedRoute>
            <StatisticPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
