import { useState } from "react";
import { register } from "../api/auth";
import AuthForm from "../features/auth/AuthForm";
import { Link, useNavigate } from "react-router-dom";

interface FieldsProps {
  username: string;
  setUsername: (username: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  passwordConfirm: string;
  setPasswordConfirm: (passwordConfirm: string) => void;
}

function Fields({ username, setUsername, email, setEmail, password, setPassword, passwordConfirm, setPasswordConfirm}: FieldsProps) {
  return (  
    <>
      <input 
        name="username" 
        className="auth-form__controls" 
        type="text" 
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Username" 
        required 
      />
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
      <input 
        name="confirmPassword" 
        className="auth-form__controls" 
        type="password" 
        value={passwordConfirm}
        onChange={(event) => setPasswordConfirm(event.target.value)}
        placeholder="Confirm password" 
        required 
      />
    </>
  );
}

function Footer() {
  return (
    <p>
      Have existed account? <Link to="/login">Login</Link>
    </p>
  );
}

function RegisterPage() {

    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordConfirm, setPasswordConfirm] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (password !== passwordConfirm) {
        setError("Passwords do not match");
        return;
      }

      setError(null)
      register({ username, email, password })
        .then(() => navigate("/login"))
        .catch(() => setError("error in register process"))
  };

  return (
    <AuthForm
      onSubmit={handleFormSubmit}
      error={error}
      fields={
      <Fields username={username} 
        setUsername={setUsername} 
        email={email} 
        setEmail={setEmail} 
        password={password} 
        setPassword={setPassword} 
        passwordConfirm={passwordConfirm} 
        setPasswordConfirm={setPasswordConfirm}
      />}
      submitLabel="Register"
      footer={<Footer />}
    />
  );
}

export default RegisterPage;