import "./AuthForm.css";
import loginImg from "../../assets/images/loginImg.jpg";

function AuthForm({ onSubmit, error, fields, submitLabel, footer }: { onSubmit: (event: React.FormEvent<HTMLFormElement>) => void; error?: string | null; fields: React.ReactNode; submitLabel: string; footer: React.ReactNode }) {
  return (
    <div className="auth-form">
      <img className="auth-form__img" src={loginImg} alt="Logo" />
      <article className="auth-form__article">
        <h1 className="auth-form__title">Hello in Pocket</h1>
        {error && <p className="error">{error}</p>}

        <form className="auth-form__form" onSubmit={(event) => onSubmit(event)}>
          {fields}
          <button className="auth-form__button" type="submit">
            {submitLabel}
          </button>
        </form>

        <div className="auth-form__footer">{footer}</div>
      </article>
    </div>
  );
}

export default AuthForm;