import "../assets/css/components/LoginPage.css";
import AuthForm from "../features/auth/authForm";
import { Link } from "react-router-dom";

function Fields() {
  return (
    <>
      <input className="auth-form__controls" type="email" placeholder="Email" />
      <input className="auth-form__controls" type="password" placeholder="Password" />
    </>
  );
}

function Footer() {
  return (
    <>
      <p>Haven't registered yet? <Link to="/register">Register</Link></p>
    </>
  )
}

function LoginPage() {  

  const handleFormSubmit = (event) => {
    event.stopPropagation();
    console.log("Submit")
  }

  return (
    <AuthForm
      onSubmit={handleFormSubmit}
      error="Not correct password"
      fields={<Fields />}
      submitLabel="Login"
      footer={<Footer />}
    />
  );
}

export default LoginPage;