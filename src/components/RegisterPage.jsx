import { use, useState } from "react";
import { register } from "../api/auth";
import AuthForm from "../features/auth/AuthForm";
import { Link } from "react-router-dom";

function Fields() {
  return (  
    <>
      <input 
        name="username" 
        className="auth-form__controls" 
        type="text" 
        placeholder="Username" 
        required 
      />
      <input 
        name="email" 
        className="auth-form__controls" 
        type="email" 
        placeholder="Email" 
        required 
      />
      <input 
        name="password" 
        className="auth-form__controls" 
        type="password" 
        placeholder="Password" 
        required 
      />
      <input 
        name="confirmPassword" 
        className="auth-form__controls" 
        type="password" 
        placeholder="Confirm password" 
        required 
      />
    </>
  );
}

function Footer() {
  return (
    <p>
      Have existed account? <Link to="/login">Register</Link>
    </p>
  );
}

function RegisterPage() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password]
    const handleFormSubmit = (event) => {
    event.preventDefault();

    register({ username, email, password})
  };

  return (
    <AuthForm
      onSubmit={handleFormSubmit}
      error={null}
      fields={<Fields />}
      submitLabel="Register"
      footer={<Footer />}
    />
  );
}

export default RegisterPage;