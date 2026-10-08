import { login } from "../api/auth";
import AuthForm from "../features/auth/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { setToken } from "../api/tokenStorage"

interface FieldsProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

function Fields({email, password, setEmail, setPassword}: FieldsProps) {
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

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    login({email, password})
      .then((data) => {
        setToken(data.access_token);
        navigate("/pocket")
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