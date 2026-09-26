import { BrowserRouter, Routes, Route } from "react-router-dom";
import './assets/css/main/App.css'
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Sidebar from './components/Sidebar'
import Modal from './components/Modal'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <LoginPage />;
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
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <MainApp />
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
