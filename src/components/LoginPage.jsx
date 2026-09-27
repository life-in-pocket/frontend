import { login } from "../api/auth";
import AuthForm from "../features/auth/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Fields({email, password, setEmail, setPassword}) {
  return (  
    <>
      <input 
        name="email" 
        className="auth-form__controls" 
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email" 
        required 
      />
      <input 
        name="password" 
        className="auth-form__controls" 
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password" 
        required 
      />
    </>
  );
}

function Footer() {
  return (
    <p>
      Haven't registered yet? <Link to="/register">Register</Link>
    </p>
  );
}

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleFormSubmit = (event) => {
    event.preventDefault();

    login({email, password})
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
        navigate("/")
      })
      .catch(() => {setError("Not correct login or password")})
  };

  return (
    <AuthForm
      onSubmit={handleFormSubmit}
      error={error}
      fields={<Fields email={email} password={password} setEmail={setEmail} setPassword={setPassword}/>}
      submitLabel="Login"
      footer={<Footer />}
    />
  );
}

export default LoginPage;