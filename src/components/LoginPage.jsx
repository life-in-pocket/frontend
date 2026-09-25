import "../assets/css/components/LoginPage.css";
import loginImg from "../assets/images/loginImg.jpg";

function LoginPage() {  
  return (
    <div className="login-page">
      <img className="login-page__img" src={loginImg} alt="Logo" />
      <article className="login-page__article">
        <h1 className="login-page__title">Hello in Pocket</h1>
        <form className="login-page__form">
          <input className="login-page__controls" type="text" placeholder="Username" />
          <input className="login-page__controls" type="email" placeholder="Email" />
          <input className="login-page__controls" type="password" placeholder="Password" />
          <button className="login-page__button" type="submit">Login</button>
        </form>
      </article>
    </div>
  );
}

export default LoginPage;