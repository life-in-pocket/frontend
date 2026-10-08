import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getToken } from './api/tokenStorage';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Modal from './pages/Modal';
import Statistic from "./pages/Statistic";
import './assets/css/App.css';

function ProtectedRoute({ children }: { children: React.ReactNode }): React.ReactNode {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children;
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
            <Modal />
          </ProtectedRoute>
        }/>
        <Route path="/statistics" element={
          <ProtectedRoute>
            <Statistic />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
